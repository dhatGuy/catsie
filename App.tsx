import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AssetIconsPack } from "./Icon";
import mapping from "./mapping.json";
import TabNavigator from "./navigation/TabNavigator";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
