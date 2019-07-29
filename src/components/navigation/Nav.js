import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import colors from "../../config/colors";
import firebase from 'react-native-firebase'
signOutUser = async () => {
  try {
      await firebase.auth().signOut();
  } catch (e) {
      console.warn(e);
  }
}

const Nav = ({ title, navigation, leftIcon }) => (
  <View style={{ backgroundColor: 'white' }}>
    <View style={styles.container}>
      {/*<View style={styles.leftRow}>
        <Icon
          size={34}
          type="ionicon"
          name="ios-arrow-back"
          underlayColor="transparent"
          underlineColorAndroid="transparent"
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          color={colors.BLUE}
          iconStyle={styles.icon}
          containerStyle={styles.iconContainer}
          onPress={() => navigation.openDrawer()}
          {...leftIcon}
        />
      </View>*/}
      <View style={styles.centerRow}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.rightRow}>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  centerRow: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    height: 55,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 22,
  },
  icon: {
    justifyContent: 'flex-start',
    marginTop: 2.8,
  },
  iconContainer: {
    alignSelf: 'center',
  },
  leftRow: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logoutText: {
    color: colors.BLUE,
    fontSize: 18,
    fontWeight: '400',
  },
  rightRow: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
  },
})
export default Nav
