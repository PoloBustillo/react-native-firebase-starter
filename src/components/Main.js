import * as React from "react";
import { Button} from "react-native";
import firebase from 'react-native-firebase'


class Main extends React.Component {

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


export default Main;
