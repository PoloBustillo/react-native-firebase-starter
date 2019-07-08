import * as React from "react";
import { Button} from "react-native";
import firebase from 'react-native-firebase'
import { createAppContainer, createDrawerNavigator } from "react-navigation";


class Main extends React.Component {

  constructor() {
   super();
   console.warn('CONSTRUCTOR');
   this.state={costoMasa:0};
   this.ref = firebase.firestore().collection('tortillerias');


   let observer = this.ref.onSnapshot(docSnapshot => {
     this.setState({costoMasa:docSnapshot})
     const items = {}
     docSnapshot.forEach(item => {
       items[item.id] =  item.data()
       console.warn(item);
       console.warn(item.data().costoMasa);
      })


   }, err => {
     console.warn(`Encountered error: ${err}`);
   });
  }



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
