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
import {Form, Item, Input, Label, Content, Accordion, Icon} from 'native-base'
import Nav from '../navigation/Nav';
import firebase from 'react-native-firebase';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as actionCreators from '../../actions';
import InfoText from '../elements/InfoText'
import FormTextInput from '../elements/FormTextInput';
import Button from '../elements/Button'


class UpdateTortilleria extends React.Component {

  state = {
    name:'',
    key:'',
    stock:{}
  }
  componentDidMount(){
    this.setState(this.props.navigation.state.params);
    this.count = {}
  }

  updateTortilleria = (name,stock, id)=>{
    console.warn(this.count);
    for(proCount in this.count){
      console.warn(proCount);
      console.warn(this.count[proCount])
    }
    var addDoc = firebase.firestore().collection('tortillerias').doc(id)
      .update({
        name: name,
        stock: stock
      })
      .then(ref => {
        console.log('Updated document with ID: ', ref);
    });

    this.setState({isVisible:false});
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
        <Col>
          <Text style={{ fontWeight: "600" }}>
            Inventario
          </Text>
          <NumericInput
            type='none'
            initValue={this.state.stock[item.name]}
            minValue={this.state.stock[item.name]}
            maxValue={this.state.stock[item.name]}
            totalWidth={120}
            editable={false}
            totalHeight={40}
            iconSize={25}
            rounded
            textColor='#B0228C'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#EA3788'
            leftButtonBackgroundColor='#E56B70'/>
        </Col>
        <Col>
          <Text style={{ fontWeight: "600" }}>
            Añadir
          </Text>
          <NumericInput
            totalWidth={120}
            onChange={(value)=>{this.count={...this.count,[item.name]:value}}}
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
      </Grid>
    );
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Nav
            title={`Actualizar ${this.state.name}`}
            navigation={this.props.navigation}
            leftIcon={{
            type: 'ionicon',
            name: 'md-list',
            size: 26,
            }} />

            <Form>
              <InfoText text="Nombre Tortilleria" style={styles.container}/>
              <Item>
                <Input value={this.state.name} onChangeText={(text) => this.setState({name: text})}/>
              </Item>
              <InfoText text="Inventario" style={styles.container}/>
              <Content padder style={{ backgroundColor: "white" }}>
               <Accordion
                 dataArray={this.props.productos}
                 animation={true}
                 expanded={true}
                 renderHeader={this._renderHeader}
                 renderContent={this._renderContent.bind(this)}
               />
              </Content>
              <Button
                label="Actualizar Tortilleria"
                onPress={()=>{
                  this.updateTortilleria(this.state.name,
                    this.state.stock, this.state.key)
                  this.props.navigation.navigate('TortilleriasList');
                }}
              />
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
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight:'bold'
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTortilleria);
