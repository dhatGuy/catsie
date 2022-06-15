import { Layout, List, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import CatCardItem from "../components/cards/CatCardItem";
import useGetCats from "../hooks/useGetCats";

const CatList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetched,
    hasNextPage,
  } = useGetCats();

  if (isLoading) {
    return (
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner size={"giant"} />
      </Layout>
    );
  }

  const Footer = () =>
    isFetchingNextPage && hasNextPage ? (
      <Layout style={styles.footer}>
        <Spinner status={"info"} size="giant" />
      </Layout>
    ) : hasNextPage ? null : (
      <Layout style={styles.footer}>
        <Text>No more cats to load</Text>
      </Layout>
    );

  const loadMore = () => fetchNextPage();

  return (
    <List
      style={styles.container}
      keyExtractor={(item) => item.id}
      data={data?.pages.map((page) => page.data).flat()}
      renderItem={({ item }) => <CatCardItem item={item} />}
      ListFooterComponent={Footer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      removeClippedSubviews={true}
      extraData={isFetched}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={8}
      windowSize={11}
      initialNumToRender={8}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default CatList;
