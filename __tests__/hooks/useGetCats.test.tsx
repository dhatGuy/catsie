import { renderHook } from "@testing-library/react-hooks";
import { act, waitFor } from "@testing-library/react-native";
import fetch from "jest-fetch-mock";
import useGetCats from "../../hooks/useGetCats";
import ReactQueryWrapper from "../../utils/TestWrapper";

beforeEach(() => {
  fetch.resetMocks();
});

function generateMockedResponse(pageParam: number) {
  if (pageParam > 6) return [];

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

test("should return undefined on last page", async () => {
  fetch.mockResponse(JSON.stringify(generateMockedResponse(0)));

  const { result } = renderHook(() => useGetCats(), {
    wrapper: ReactQueryWrapper,
  });

  await waitFor(() => result.current.isSuccess);

  fetch.mockResponse(JSON.stringify(generateMockedResponse(1)));
  await act(() => result.current.fetchNextPage());

  fetch.mockResponse(JSON.stringify(generateMockedResponse(2)));
  await act(() => result.current.fetchNextPage());

  fetch.mockResponse(JSON.stringify(generateMockedResponse(3)));
  await act(() => result.current.fetchNextPage());

  fetch.mockResponse(JSON.stringify(generateMockedResponse(4)));
  await act(() => result.current.fetchNextPage());

  fetch.mockResponse(JSON.stringify(generateMockedResponse(5)));
  await act(() => result.current.fetchNextPage());

  fetch.mockResponse(JSON.stringify(generateMockedResponse(6)));
  await act(() => result.current.fetchNextPage());

  // try to fetch next page after last page
  fetch.mockResponse(JSON.stringify(generateMockedResponse(7)));
  await act(() => result.current.fetchNextPage());

  expect(result.current.data?.pages[7]).toBeUndefined();
});
