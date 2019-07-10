import React, { Component } from 'react';

import TortilleriasList from '../views/TortilleriasList';
import Tortilleria from '../views/Tortilleria';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

export const Navigator = createStackNavigator({
  TortilleriasList: { screen: TortilleriasList,
    navigationOptions: {
                    header: null,
                  }},
  Tortilleria: { screen: Tortilleria },
},{
  initialRouteName: 'TortilleriasList',
  headerMode: 'none'
})

const Home = createAppContainer(Navigator);

export default Home;
