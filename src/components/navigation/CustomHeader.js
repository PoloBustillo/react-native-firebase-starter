import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { Button, Text} from 'react-native-elements';
import { View, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import firebase from 'react-native-firebase'

class CustomHeader extends React.Component{
  constructor () {
      super();
  }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Settings')
    } catch (e) {
        console.warn(e);
    }
  }

  render(){
    return(
      <View style={[styles.container]}>
        <Grid>
          <Row>
            <Col size={1}/>
            <Col size={2}>
              <Icon name="bars"
                onPress={() => this.props.navigation.openDrawer()}
                size={20}/>
            </Col>
            <Col size={6}>
              <Text h4>Tortillerias App</Text>
            </Col>
            <Col size={2}>
                <Button
                title="Salir"
                type="clear"
                color='red'
                onPress={() => this.signOutUser()} />
            </Col>
            <Col size={1}/>
          </Row>
        </Grid>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    height: 70,
    paddingTop: 20,
    paddingLeft: 20
  }
});
export default CustomHeader;
