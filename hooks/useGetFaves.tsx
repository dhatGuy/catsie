import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";

const useGetFaves = () => {
  const { getItem } = useAsyncStorage("fave");

  const getFaves = async () => {
    try {
      const fave = await getItem();
      if (fave != null) {
        return JSON.parse(fave);
      }
    } catch (e) {
      // saving error
      console.log(e);
      throw e;
    }
  };

  return useQuery("faves", getFaves);
};

export default useGetFaves;
