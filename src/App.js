import React, { Component } from 'react';
import Loading from './components/transitions/Loading';
import SignUp from './components/Signup';
import {Platform, View} from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
  Loading: Loading,
  SignUp: SignUp,
  },
  {
    index: 0,
    initialRouteName: 'Loading',
    headerMode: 'null',
    navigationOptions: {
      gesturesEnabled: true
    }
  }
)

const App = createAppContainer(RootStack);

export default App;
