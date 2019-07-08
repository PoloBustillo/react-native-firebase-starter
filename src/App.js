import React, { Component } from 'react';
import Loading from './components/transitions/Loading';
import SignUp from './components/views/Signup';
import {Platform, View} from 'react-native';
import Main from './components/navigation/Main';
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
  Main: Main
  },
  {
    index: 0,
    initialRouteName: 'Loading',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

const App = createAppContainer(RootStack);

export default App;
