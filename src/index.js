import {AppRegistry} from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './configureStore';

const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)
AppRegistry.registerComponent(appName, () => Root);
