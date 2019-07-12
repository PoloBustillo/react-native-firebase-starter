import React, { Component } from 'react';

import TortilleriasList from '../views/TortilleriasList';
import ReportList from '../views/ReportList';
import ReportInfo from '../views/ReportInfo';

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
  ReportList: { screen: ReportList },
  ReportInfo: { screen: ReportInfo },
},{
  initialRouteName: 'TortilleriasList',
  headerMode: 'none'
})


const Home = createAppContainer(Navigator);

export default Home;
