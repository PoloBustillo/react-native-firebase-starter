import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { createAppContainer, createDrawerNavigator } from "react-navigation";

import CustomDrawerNavigator from "./CustomDrawerNavigator";
import Home from "./Home";
import Settings from "../views/Settings";
import About from "../views/About";

const MainNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
        <Icon name="home"  style={{ color: tintColor }} size={35}/>
        ),
        drawerLabel: "Home"
      },
      screen: Home
    },

    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
        <Icon name="cog"  style={{ color: tintColor }} size={35}/>
        ),
        drawerLabel: "Configuraciones"
      },
      screen: Settings
    },

    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
        <Icon name="question"  style={{ color: tintColor }} size={35}/>
        ),
        drawerLabel: "About"
      },
      screen: About
    }
  },
  {
    contentComponent: CustomDrawerNavigator
  }
);

const Main = createAppContainer(MainNavigator);
export default Main;
