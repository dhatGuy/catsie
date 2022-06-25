import { Icon, Layout, Text } from "@ui-kitten/components";
import React, { memo } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import useGetFaves from "../../hooks/useGetFaves";

function CatCardItem({ item, index, toggleFave }) {
  const { data } = useGetFaves();
  const [isFave, setIsFave] = React.useState(false);

  React.useEffect(() => {
    const isFave = data?.some((cat) => cat.id === item.id);
    setIsFave(isFave);
  }, [data, item.id]);

  return (
    <Layout style={styles.container} testID={`cat-row-${index}`}>
      <Layout style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{
            uri: item?.image?.url || "https://placekitten.com/200/200",
          }}
          accessibilityLabel={`${item?.name}-image`}
        />
        <Text category={"s1"}>{item.name}</Text>
      </Layout>
      {isFave ? (
        <Pressable
          onPress={toggleFave}
          accessibilityLabel="remove from favourites"
        >
          <Icon width={20} height={20} fill="#DE0202" name="heart" />
        </Pressable>
      ) : (
        <Pressable onPress={toggleFave} accessibilityLabel="add to favourites">
          <Icon width={20} height={20} fill="#272123" name="heart-outline" />
        </Pressable>
      )}
    </Layout>
  );
}

export default memo(CatCardItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: "contain",
  },
});
