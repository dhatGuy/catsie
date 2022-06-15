import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import React from "react";
import Favorites from "../screens/Favorites";
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
        icon={(props) => <Icon {...props} name="email-outline" />}
      />
      <BottomNavigationTab
        title="Cats I Like"
        icon={(props) => <Icon {...props} name="heart" />}
      />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="All Cats" component={Home} />
    <Screen name="Cats I Like" component={Favorites} />
  </Navigator>
);

export default TabNavigator;
