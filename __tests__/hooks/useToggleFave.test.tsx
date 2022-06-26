import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { renderHook } from "@testing-library/react-hooks";
import { act, waitFor } from "@testing-library/react-native";
import useToggleFave from "../../hooks/useToggleFave";
import ReactQueryWrapper from "../../utils/TestWrapper";

describe("useToggleFave", () => {
  const cat = {
    id: "cat1",
    name: "cat1",
    image: {
      url: "https://example.com/cat1.jpg",
    },
  };

  beforeEach(async () => {
    AsyncStorage.clear();
  });

  afterEach(() => {});

  it("should toggle fave correctly", async () => {
    const { result } = renderHook(() => useToggleFave(), {
      wrapper: ReactQueryWrapper,
    });

    // add to fave
    act(() => {
      result.current.mutate(cat);
    });
    await waitFor(() => result.current.isSuccess);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "fave",
      JSON.stringify([cat])
    );
    expect(await AsyncStorage.getItem("fave")).toStrictEqual(
      JSON.stringify([cat])
    );

    // remove from fave
    act(() => {
      result.current.mutate(cat);
    });
    await waitFor(() => result.current.isSuccess);

    let faves = await AsyncStorage.getItem("fave");

    expect(faves).toStrictEqual(JSON.stringify([]));
  });
});
