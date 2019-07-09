import * as React from "react";
import {View,StyleSheet} from "react-native";
import firebase from 'react-native-firebase'
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import CustomHeader from '../navigation/CustomHeader';
import { Card, Button, Text, Icon} from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import Nav from '../navigation/Nav';

class Home extends React.Component {

  componentDidMount(){
     this.ref = firebase.firestore().collection('settings').doc('report');

     let observer = this.ref.onSnapshot(docSnapshot => {
        console.warn(`Received doc snapshot: ${docSnapshot.data().costoMasa}`);
        // ...
      }, err => {
        console.warn(`Encountered error: ${err}`);
      });

  }
  render() {
    return (
      <View style={styles.container}>
      <Nav
        title='Home'
        navigation={this.props.navigation}
        leftIcon={{
        type: 'ionicon',
        name: 'md-list',
        size: 26,
        }} />
       <Grid>
         <Row style={{backgroundColor: 'red'}}>
            <Col style={{backgroundColor: 'green'}}/>
            <Col style={{backgroundColor: 'yellow'}}/>
         </Row>
         <Row style={{backgroundColor: 'red'}}>
            <Col style={{backgroundColor: 'red'}}/>
            <Col style={{backgroundColor: 'blue'}}/>
         </Row>
         <Row style={{backgroundColor: 'blue'}} />
       </Grid>
     </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 10
  },
});

export default Home;
