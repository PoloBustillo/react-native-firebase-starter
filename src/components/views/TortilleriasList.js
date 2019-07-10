import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Nav from '../navigation/Nav';
import FooterNav from '../elements/Footer'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";

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

export default class TortilleriasList extends React.Component {

  state = {
    tortillerias:[],
    isAdmin:false
  }

  componentWillUnmount() {
    this.observer();
  }

  componentDidMount(){
    console.warn('DIDMOUNT');
    this.ref = firebase.firestore().collection('tortillerias');
    this.observer = this.ref.onSnapshot(docSnapshot => {
      let arrayData = [];
      docSnapshot.forEach(function(element) {
        arrayData.push({...element.data(),key:element.data().zona});
      });
      this.setState({tortillerias:arrayData})
    }, err => {
      console.warn(err);
    });

    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        user.getIdTokenResult(true)
        .then((idTokenResult) => {
          this.setState({isAdmin:idTokenResult.claims.admin})
          return idTokenResult.claims.admin;
        })
      }
    });



  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={()=>{this.props.navigation.navigate('Tortilleria',item)}}
      >
        <Grid>
          <Row size={4}>
            <Icon
              name="trash"
              size={35}
              color={'white'}
              style={{marginRight:90}}
              onPress={()=>console.warn('LOL')}
            />
            <Icon
              name="edit"
              size={35}
              color={'white'}
            />
          </Row>
          <Row size={2}>
            <Text
            style={styles.itemText}>{item.zona}</Text>
          </Row>
          <Row size={4}/>
        </Grid>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
      <Nav
        title='Home'
        navigation={this.props.navigation}
        leftIcon={{
        type: 'ionicon',
        name: 'md-list',
        size: 26,
        }} />
      <FlatList
        data={formatData(this.state.tortillerias, numColumns)}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
      <FooterNav  style={styles.footer}/>
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
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
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
