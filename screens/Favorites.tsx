import { List, Text } from "@ui-kitten/components";
import React from "react";
import FaveCatCard from "../components/cards/FaveCatCard";
import useGetFaves from "../hooks/useGetFaves";

const Favorites = () => {
  const { data, isLoading, isFetched } = useGetFaves();
  if (isLoading) return <Text>loading...</Text>;
  return (
    <List
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        backgroundColor: "#fff",
        paddingVertical: 15,
        flexGrow: 1,
      }}
      data={data}
      renderItem={({ item }) => <FaveCatCard cat={item} />}
      numColumns={2}
      columnWrapperStyle={{
        paddingBottom: 15,
      }}
      key={2}
      removeClippedSubviews={true}
      extraData={isFetched}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Favorites;
