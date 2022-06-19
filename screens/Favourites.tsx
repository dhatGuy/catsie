import { Layout, List, Spinner } from "@ui-kitten/components";
import React from "react";
import FaveCatCard from "../components/cards/FaveCatCard";
import EmptyFave from "../components/EmptyFave";
import useGetFaves from "../hooks/useGetFaves";

const Favourites = () => {
  const { data, isLoading, isFetched } = useGetFaves();

  if (isLoading)
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Spinner status={"info"} size="giant" />
      </Layout>
    );

  if (!data.length) return <EmptyFave />;

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

export default Favourites;
