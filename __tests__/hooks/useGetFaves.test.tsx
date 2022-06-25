import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react-native";
import useGetFaves from "../../hooks/useGetFaves";
import ReactQueryWrapper from "../../utils/TestWrapper";

describe("<useGetFaves.test />", () => {
  afterEach(() => {
    AsyncStorage.clear();
  });

  test("should return an empty array if no fave cat", async () => {
    const { result } = renderHook(() => useGetFaves(), {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual([]);
  });

  test("should have an array with one item", async () => {
    const expectedCat = {
      id: "cat1",
      name: "cat1",
      image: {
        url: "https://example.com/cat1.jpg",
      },
    };

    AsyncStorage.setItem("fave", JSON.stringify([expectedCat]));

    const { result } = renderHook(() => useGetFaves(), {
      wrapper: ReactQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual([expectedCat]);
  });
});
