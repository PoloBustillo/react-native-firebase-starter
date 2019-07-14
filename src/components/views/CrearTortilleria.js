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


class CrearTortilleria extends React.Component {

  state = {
    name:'',
    address:'',
    desc:'',
    stock:{}
  }
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        marginTop:10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#A9DAD6" }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.name}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent(item) {
    return (
      <Grid style={{marginTop:10}}>
        <Col/>
        <Col>
          <NumericInput
            totalWidth={150}
            onChange={(value)=>this.setState(prevState=>({
              stock: {                   // object that we want to update
                ...prevState.stock,    // keep all other key-value pairs
                [item.name]:value     // update the value of specific key
              }
            }))}
            minValue={0}
            totalHeight={40}
            iconSize={25}
            step={1}
            valueType='integer'
            rounded
            textColor='#B0228C'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#EA3788'
            leftButtonBackgroundColor='#E56B70'/>
        </Col>
        <Col/>
      </Grid>
    );
  }

  addNewTortilleria = (name,address, desc, stock)=>{
    var addDoc = firebase.firestore().collection('tortillerias')
      .add({
        name: name,
        zona: address,
        poc: desc,
        stock:stock
      })
      .then(ref => {
        console.log('Added document with ID: ', ref.id);
    });
    console.log(stock);

  }

  render() {
    return (
      <View>
        <ScrollView>
          <Nav
            title='Crear Tortilleria nueva'
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
                <Input value={this.state.address} onChangeText={(text) => this.setState({address: text})}/>
              </Item>
              <Item floatingLabel last>
                  <Label>Descripción:</Label>
                  <Input  value={this.state.desc} onChangeText={(text) => this.setState({desc: text})}/>
              </Item>
              <Content padder style={{ backgroundColor: "white" }}>
               <Accordion
                 dataArray={this.props.productos}
                 animation={true}
                 expanded={true}
                 renderHeader={this._renderHeader}
                 renderContent={this._renderContent.bind(this)}
               />
              </Content>
              <Button full info style={{marginTop:60}}
                onPress={()=>{
                  this.addNewTortilleria(this.state.name,this.state.address,this.state.desc,this.state.stock)
                  this.setState({name:'',address:'',desc:''})
                  this.props.navigation.navigate('TortilleriasList');
                }}>
               <Text>Crear Tortilleria</Text>
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
    productos:state.settingsReducer.productos
  }
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(CrearTortilleria);
