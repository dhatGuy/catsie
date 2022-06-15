import { Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import useToggleFave from "../../hooks/useToggleFave";

const FaveCatCard = ({ cat }) => {
  const toggleFaveMutation = useToggleFave();

  const toggleFave = () => {
    toggleFaveMutation.mutate(cat, {});
  };

  return (
    <Layout style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: cat?.image?.url || "https://placekitten.com/200/200",
        }}
      />
      <Layout
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text category={"s1"}>{cat.name}</Text>

        <Pressable onPress={toggleFave}>
          <Icon width={20} height={20} fill="#DE0202" name="heart" />
        </Pressable>
      </Layout>
    </Layout>
  );
};

export default FaveCatCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "50%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: "contain",
  },
});
