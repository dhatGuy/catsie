import Config from "react-native-config";
import { useInfiniteQuery } from "react-query";

export default function useGetCats() {
  const getCats = async ({ pageParam = 0 }) => {
    const data = await (
      await fetch(
        `https://api.thecatapi.com/v1/breeds?limit=10&page=${pageParam}`,
        {
          headers: {
            "x-api-key": Config.API_KEY,
          },
        }
      )
    ).json();

    return { data, nextPage: pageParam + 1 };
  };

  return useInfiniteQuery(["cats"], getCats, {
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage > 6) return undefined;

      return lastPage.nextPage;
    },
  });
}
