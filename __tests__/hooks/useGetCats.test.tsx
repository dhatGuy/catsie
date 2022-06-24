import { renderHook } from "@testing-library/react-hooks";
import { act, waitFor } from "@testing-library/react-native";
import fetch from "jest-fetch-mock";
import useGetCats from "../../hooks/useGetCats";
import ReactQueryWrapper from "../../utils/TestWrapper";

beforeEach(() => {
  fetch.resetMocks();
});

function generateMockedResponse(pageParam: number) {
  return {
    nextPage: pageParam + 1,
    data: [
      {
        id: "cat1",
        name: "cat1",
        image: {
          url: "https://example.com/cat1.jpg",
        },
      },
    ],
  };
}

test("should return all cats correctly", async () => {
  fetch.mockResponse(JSON.stringify(generateMockedResponse(0)));

  const { result } = renderHook(() => useGetCats(), {
    wrapper: ReactQueryWrapper,
  });

  expect(fetch.mock.calls[0][0]).toBe(
    "https://api.thecatapi.com/v1/breeds?limit=10&page=0"
  );
  await waitFor(() => result.current.isSuccess);

  expect(result.current.data?.pages[0].data).toStrictEqual(
    generateMockedResponse(0)
  );

  fetch.mockResponse(JSON.stringify(generateMockedResponse(1)));
  await act(() => result.current.fetchNextPage());

  expect(fetch.mock.calls[1][0]).toBe(
    "https://api.thecatapi.com/v1/breeds?limit=10&page=1"
  );

  expect(result.current.data?.pages[1].data).toEqual(generateMockedResponse(1));
});
