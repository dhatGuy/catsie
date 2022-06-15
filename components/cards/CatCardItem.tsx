import { Icon, Layout, Text } from "@ui-kitten/components";
import React, { memo } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import useGetFaves from "../../hooks/useGetFaves";
import useToggleFave from "../../hooks/useToggleFave";

function CatCardItem({ item }) {
  const toggleFaveMutation = useToggleFave();
  const { data } = useGetFaves();
  const [isFave, setIsFave] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      const isFave = data.some((cat) => cat.id === item.id);
      setIsFave(isFave);
    }
  }, [data, item.id]);

  const toggleFave = () => {
    const prevIsFave = isFave;
    setIsFave(!prevIsFave);
    toggleFaveMutation.mutate(item, {
      onError: (error) => {
        setIsFave(prevIsFave);
      },
    });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{
            uri: item?.image?.url || "https://placekitten.com/200/200",
          }}
        />
        <Text category={"s1"}>{item.name}</Text>
      </Layout>
      {isFave ? (
        <Pressable onPress={toggleFave}>
          <Icon width={20} height={20} fill="#DE0202" name="heart" />
        </Pressable>
      ) : (
        <Pressable onPress={toggleFave}>
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
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
    resizeMode: "contain",
  },
  icon: {
    // alignSelf: "flex-end",
  },
});
