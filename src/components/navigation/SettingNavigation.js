import React, { Component } from 'react';

import Settings from '../views/Settings';
import SettingsProducts from '../views/SettingsProducts';

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

export const Navigator = createStackNavigator({
  SettingsProducts: { screen: SettingsProducts },
  Settings: { screen: Settings },
},{
  initialRouteName: 'Settings',
  headerMode: 'none'
})
SettingNavigation = createAppContainer(Navigator);

export default SettingNavigation;
