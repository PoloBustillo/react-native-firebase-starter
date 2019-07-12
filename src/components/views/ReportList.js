import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'
import colors from "../../config/colors";
import Nav from '../navigation/Nav';
import FooterNav from '../elements/Footer'

import PhotoButton from '../elements/PhotoButton'


class Tortilleria extends Component {

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>For Sale Property Details</Text>
        <Text style={styles.subDetailText}>details.....</Text>
      </View>
    )
  }

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.priceText}>$1,175,000</Text>
        <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
        <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
        <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>
      </View>
    )
  }

  renderNavigator = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>DIRECTIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>STREET VIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 1 }]}>
          <Text style={styles.navigatorText}>MAP</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderContactHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            style={styles.coverImage}
          >
            <PhotoButton />
          </ImageBackground>
        </View>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    console.warn(navigation);
    console.warn(item);
    return (
      <View style={styles.mainviewStyle}>
        <Nav
          title='Lista de Reportes'
          navigation={this.props.navigation}
          leftIcon={{
          type: 'ionicon',
          name: 'md-list',
          size: 26,
          }} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderNavigator()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>EMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  coverContainer: {
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  scroll: {
    backgroundColor: '#FFF',
    flex: 1,
    marginBottom: 55,
  },
  productRow: {
    margin: 25,
  },
  mainviewStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
  },
  coverMetaContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
    // marginBottom: 15,
    // marginRight: 15,
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F64A25',
    flexDirection: 'row',
    height: 65,
    alignItems: 'center',
  },
  buttonFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navigatorButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  navigatorText: {
    color: colors.GREEN,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'center',

    fontSize: 16,
  },
  borderCenter: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#FFA890',
  },
  textFooter: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18,
  },
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,

    color: colors.BLACK,
    fontSize: 36,
    fontWeight: '400',
  },
  detailText: {
    marginBottom: 4,
    color: colors.black,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subDetailText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  descriptionText: {
    marginBottom: 4,
    color: colors.GRAY,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
});
export default Tortilleria
