import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import {Form, Item, Input, Label, Button, Content, Accordion, Icon} from 'native-base'
import Nav from '../navigation/Nav';
import firebase from 'react-native-firebase';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as actionCreators from '../../actions';


class UpdateTortilleria extends React.Component {


  state = {
    name:'',
    zona:'',
    poc:'',
    key:''
  }
  componentDidMount(){
    this.setState(this.props.navigation.state.params);
  }

  updateTortilleria = (name,address, desc, id)=>{
    var addDoc = firebase.firestore().collection('tortillerias').doc(id)
      .update({
        name: name,
        zona: address,
        poc: desc
      })
      .then(ref => {
        console.log('Updated document with ID: ', ref);
    });

    this.setState({isVisible:false});
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Nav
            title={`Actualizar tortilleria ${this.state.name}`}
            navigation={this.props.navigation}
            leftIcon={{
            type: 'ionicon',
            name: 'md-list',
            size: 26,
            }} />
            <Form>
              <Item floatingLabel>
                <Label>Nombre Tortilleria:</Label>
                <Input value={this.state.name} onChangeText={(text) => this.setState({name: text})}/>
              </Item>
              <Item floatingLabel>
                <Label>Dirrección:</Label>
                <Input value={this.state.zona} onChangeText={(text) => this.setState({zona: text})}/>
              </Item>
              <Item floatingLabel last>
                  <Label>Descripción:</Label>
                  <Input  value={this.state.poc} onChangeText={(text) => this.setState({poc: text})}/>
              </Item>
              <Button full info style={{marginTop:60}}
                onPress={()=>{
                  this.updateTortilleria(this.state.name,this.state.zona,this.state.poc, this.state.key)
                  this.props.navigation.navigate('TortilleriasList');
                }}>
               <Text>Actualizar Tortilleria</Text>
             </Button>
            </Form>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    paddingTop: '5%',
    paddingLeft:'5%',
    paddingRight:'5%',
    color: '#fff',
    fontSize: 20
  },
  footer: {
    position: 'absolute',
    bottom: 0
  },
});

const mapStateToProps = (state) => {
  return {
    isAdmin:state.sessionReducer.isAdmin
  }
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTortilleria);
