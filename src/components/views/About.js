import * as React from "react";
import { Button, View} from "react-native";
import firebase from 'react-native-firebase'
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import Nav from '../navigation/Nav';

class Settings extends React.Component {

  render() {
    return (
      <View>
      <Nav
        title='About'
        navigation={this.props.navigation}
        leftIcon={{
        type: 'ionicon',
        name: 'md-list',
        size: 26,
        }} />

      </View>
      )
    }
}


export default Settings;
