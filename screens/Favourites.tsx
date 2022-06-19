import { Layout, List, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import FaveCatCard from "../components/cards/FaveCatCard";
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

  if (!data.length) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">No favourites 😿</Text>
        <Text
          appearance={"hint"}
          style={{
            textAlign: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          You can add favourites by clicking on the heart icon on the cat card.
        </Text>
      </Layout>
    );
  }

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
