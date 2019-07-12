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
import {Form, Item, Input, Label, Button} from 'native-base'
import {
  Overlay
} from 'react-native-elements'
import Nav from '../navigation/Nav';
import FooterNav from '../elements/Footer'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as actionCreators from '../../actions';
import { NavigationEvents } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;


class TortilleriasList extends React.Component {

  state = {
    tortillerias:[],
    isAdmin:false,
    isVisible:false,
    showAlert: false,
    toBeDeleted: '',
    name:'',
    address:'',
    desc:''
  }

  deleteTortilleria = (id)=>{
    this.ref = firebase.firestore()
      .collection('tortillerias').doc(id).delete();
  }

  addNewTortilleria = (name,address, desc)=>{
    var addDoc = firebase.firestore().collection('tortillerias')
      .add({
        name: name,
        zona: address,
        poc: desc
      })
      .then(ref => {
        console.warn('Added document with ID: ', ref.id);
    });
    this.setState({isVisible:false});
  }

  getTortilleriasData = ()=>{
    const settings = { timestampsInSnapshots: true };
    firebase.firestore().settings(settings);
    this.ref = firebase.firestore().collection('tortillerias');
    let arrayData = [];
    this.observer = this.ref.onSnapshot(docSnapshot => {
      docSnapshot.forEach(function(element) {
        arrayData.push({...element.data(),key:element.id});
      });
      this.setState({tortillerias:arrayData})
    }, err => {
      console.warn(err);
    });
  }

  getUserData= ()=>{
    firebase.auth().onAuthStateChanged(async (user) =>{
      if(user){
        this.props.loginUserSuccess(user,false);
        let isAdmin = await user.getIdTokenResult(true)
        .then((idTokenResult) => {
          return Promise.resolve(idTokenResult.claims.admin);
        })
        this.props.loginUserSuccess(user,isAdmin);
      }
    });
  }

  componentWillUnmount() {
    this.observer();
    setState({isVisible:false});
  }

  componentDidMount(){
    this.getTortilleriasData();
    this.getUserData();
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={()=>{this.props.navigation.navigate('ReportList',item)}}
      >
        <NavigationEvents
        onWillFocus={() => {this.getTortilleriasData();}}
        onWillBlur={() => {this.observer()}}
        />
        <Grid>
          <Row size={4} style={{marginTop:20}}>
            { this.props.isAdmin && <Icon
                onPress={()=>{this.setState({showAlert: true,toBeDeleted:item.key})}}
                name="trash"
                size={35}
                color={'white'}
                style={{marginRight:90}}
              />
            }
            { this.props.isAdmin && <Icon
                name="edit"
                size={35}
                color={'white'}
              />
            }
          </Row>
          <Row size={2}>
            <Text style={styles.itemText}>{item.name}</Text>
          </Row>
          <Row size={2}>
            <Text style={styles.itemText}>{item.zona}</Text>
          </Row>
          <Row size={4}/>
        </Grid>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <ScrollView>
          <Nav
            title='Home'
            navigation={this.props.navigation}
            leftIcon={{
            type: 'ionicon',
            name: 'md-list',
            size: 26,
            }} />
          <View>
            <Overlay
              isVisible={this.state.isVisible && this.props.isAdmin}
              windowBackgroundColor="rgba(155, 155, 155, .5)"
              overlayBackgroundColor="white"
              onBackdropPress={() => this.setState({ isVisible: false })}
              width='70%'
              height='70%'
            >
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
              <Button full info style={{marginTop:60}}
                onPress={()=>{
                  this.addNewTortilleria(this.state.name,this.state.address,this.state.desc)
                  this.setState({name:'',address:'',desc:''})
                }}>
               <Text>Crear Tortilleria</Text>
             </Button>
            </Form>
            </Overlay>
            <FlatList
              data={formatData(this.state.tortillerias, numColumns)}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </View>
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Elminar Permanentemente"
            message="Seguro que desea eliminar la tortilleria"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Si, eliminala"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.setState({showAlert: false, toBeDeleted:''})
            }}
            onConfirmPressed={() => {
              this.deleteTortilleria(this.state.toBeDeleted);
              this.setState({showAlert: false,toBeDeleted:''})

            }}
            onDismiss={() => {
              this.setState({showAlert: false, toBeDeleted:''})
            }}
          />
          <FooterNav visible={this.props.isAdmin} addMethod={()=>this.setState({isVisible:true})} style={styles.footer}/>
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
  item: {
    backgroundColor: '#FEA8A1',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    height: Dimensions.get('window').width / numColumns, // approximate a square
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

export default connect(mapStateToProps, mapDispatchToProps)(TortilleriasList);
