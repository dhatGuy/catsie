import { Layout, List, Spinner } from "@ui-kitten/components";
import React from "react";
import FaveCatCard from "../components/cards/FaveCatCard";
import EmptyFave from "../components/EmptyFave";
import useGetFaves from "../hooks/useGetFaves";
import useToggleFave from "../hooks/useToggleFave";

const Favourites = () => {
  const { data, isLoading, isFetched } = useGetFaves();
  const toggleFaveMutation = useToggleFave();

  const toggleFave = (cat) => {
    toggleFaveMutation.mutate(cat);
  };

  const renderItem = ({ item, index }) => (
    <FaveCatCard
      removeFromFavourites={() => toggleFave(item)}
      index={index}
      cat={item}
    />
  );

  if (isLoading)
    return (
      <Layout
        accessibilityLabel="loading-spinner"
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
      renderItem={renderItem}
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
