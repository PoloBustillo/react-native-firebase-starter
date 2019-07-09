import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import Nav from '../navigation/Nav';
import firebase from 'react-native-firebase';
const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns =2;

export default class TortilleriasList extends React.Component {

  componentDidMount(){
     this.ref = firebase.firestore().collection('settings').doc('report');

     let observer = this.ref.onSnapshot(docSnapshot => {
        console.warn(`Received doc snapshot: ${docSnapshot.data().costoMasa}`);
        // ...
      }, err => {

      });

  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
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
        data={formatData(data, numColumns)}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
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
    color: '#fff',
  },
});
