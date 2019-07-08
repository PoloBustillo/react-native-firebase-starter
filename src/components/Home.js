import * as React from "react";
import { Button} from "react-native";
import firebase from 'react-native-firebase'
import { createAppContainer, createDrawerNavigator } from "react-navigation";


class Home extends React.Component {

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Loading')
    } catch (e) {
        console.log(e);
    }
  }

  render() {
    return (
        <Button title="logout" onPress={() => this.signOutUser()} />
      )
    }
}


export default Home;
