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
    onSuccess: (item) => {
      queryClient.invalidateQueries("faves");
    },
  });
};

export default useToggleFave;
