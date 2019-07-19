import React, { Component } from 'react';

import TortilleriasList from '../views/TortilleriasList';
import ReportList from '../views/ReportList';
import ReportInfo from '../views/ReportInfo';
import CrearTortilleria from '../views/CrearTortilleria';
import UpdateTortilleria from '../views/UpdateTortilleria'
import Settings from '../views/Settings';
import SettingsProducts from '../views/SettingsProducts';

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
  CrearTortilleria: { screen: CrearTortilleria },
  UpdateTortilleria: { screen: UpdateTortilleria }
},{
  initialRouteName: 'TortilleriasList',
  headerMode: 'none'
})


const Home = createAppContainer(Navigator);

export default Home;
