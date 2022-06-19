import { Layout, Text } from "@ui-kitten/components";
import React from "react";

export default function EmptyFave() {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
