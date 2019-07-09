import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import colors from "../../config/colors";

const PhotoButton = () => (
  <View style={styles.coverMetaContainer}>
    <Button
      color="white"
      title="41 Photos"
      icon={<Icon size={22} color="white" type="ionicon" name="md-photos" />}
      // iconContainerStyle={{ marginLeft: 10 }}
      textStyle={{
        fontSize: 16,
        fontWeight: '400',
        // paddingBottom: 8,
        // paddingRight: 10,
        // paddingTop: 8,
      }}
      buttonStyle={{
        borderWidth: 0,
        borderRadius: 5,
        paddingLeft: 10,
        // borderColor: 'transparent',
        backgroundColor: 'rgba(128,128,128, 0.7)',
        elevation: 0,
      }}
      containerStyle={{
        marginBottom: 15,
        marginRight: 15,
        padding: 0,
      }}
    />
  </View>
)

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
export default PhotoButton
