import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import React from "react";
import Favourites from "../screens/Favourites";
import Home from "../screens/Home";
import { BottomTabNavigatorParamList } from "./types";

const { Navigator, Screen } =
  createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      appearance="noIndicator"
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{
        height: 80,
        borderTopWidth: 1,
        borderTopColor: "#0000001A",
      }}
    >
      <BottomNavigationTab
        title="All Cats"
        testID="all-cats-tab"
        icon={(props) => <Icon {...props} name="cat" pack="assets" />}
      />
      <BottomNavigationTab
        title="Cats I Like"
        testID="favourites-tab"
        icon={(props) => (
          <Icon height={30} width={30} {...props} name="heart" />
        )}
      />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="All Cats" component={Home} />
    <Screen name="Cats I Like" component={Favourites} />
  </Navigator>
);

export default TabNavigator;
