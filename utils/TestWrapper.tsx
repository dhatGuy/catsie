import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AssetIconsPack } from "../Icon";
import { default as mapping } from "../mapping.json";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

export default ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
    <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
      <NavigationContainer>{children}</NavigationContainer>
    </ApplicationProvider>
  </QueryClientProvider>
);

export const UiKittenTestWrapper = ({ children }) => (
  <>
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
        <NavigationContainer>{children}</NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  </>
);
