import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "react-query";

const useToggleFave = () => {
  const { setItem, getItem } = useAsyncStorage("fave");

  const queryClient = useQueryClient();

  const toggleFave = async (item) => {
    try {
      const faves = await getItem();
      if (faves != null) {
        let parsedFaves = JSON.parse(faves);
        const isExist = parsedFaves.some((fave) => fave.id == item.id);

        isExist
          ? (parsedFaves = parsedFaves.filter((fave) => fave.id != item.id))
          : (parsedFaves = [...parsedFaves, item]);

        const jsonValue = JSON.stringify(parsedFaves);
        return await setItem(jsonValue);
      }

      const jsonValue = JSON.stringify([item]);
      await setItem(jsonValue);
    } catch (e) {
      // saving error
      throw e;
    }
  };

  return useMutation((item) => toggleFave(item), {
    onMutate: async (item: any) => {
      await queryClient.cancelQueries("faves");

      // Snapshot the previous value
      const previousFaves = queryClient.getQueryData("faves");

      const isFave = previousFaves.some((fave) => fave.id == item.id);

      // Optimistically update to the new value
      queryClient.setQueryData("faves", (old: any) => {
        if (isFave) {
          return old.filter((fave) => fave.id != item.id);
        } else {
          return [...old, item];
        }
      });

      // Return a context object with the snapshot value
      return { previousFaves };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData("faves", context?.previousFaves);
    },
    // Always refetch after error or success:
    onSettled: () => queryClient.invalidateQueries("faves"),
  });
};

export default useToggleFave;
