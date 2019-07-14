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
import { Tooltip } from 'react-native-elements';
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
    isVisible:false,
    showAlert: false,
    toBeDeleted: ''
  }

  componentWillUnmount() {
    setState({isVisible:false});
  }

  async componentWillMount(){
    this.props.loginUser();
    this.props.getTortillerias();
    this.props.loadProducts();


    firebase.messaging()
        .subscribeToTopic('reportes')
        .then(response => console.warn('response from FCM TOPIC' + response))
        .catch(error =>  console.warn('error from FCM TOPIC'+ error));

        this.notificationListener = firebase.notifications().onNotification(notification => {
            let notificationMessage = notification._android._notification._data.action;
            let recordId = notification._android._notification._data.recordID;

            let { title, body } = notification;
            //  console.log('ttttt', notification)
            // notification.android.setAutoCancel(false)
            console.warn(title, body, notificationMessage, recordId);

            const channelId = new firebase.notifications.Android.Channel(
                'Default',
                'Default',
                firebase.notifications.Android.Importance.High
            );
            firebase.notifications().android.createChannel(channelId);

            let notification_to_be_displayed = new firebase.notifications.Notification({
                data: notification._android._notification._data,
                sound: 'default',
                show_in_foreground: true,
                title: notification.title,
                body: notification.body,
            });

            notification_to_be_displayed.android
                .setPriority(firebase.notifications.Android.Priority.High)
                .android.setChannelId('Default')
                .android.setVibrate(1000);

            console.warn('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);

            firebase.notifications().displayNotification(notification_to_be_displayed);
        });
  }

  renderItem = ({ item, index }) => {
    const tooltip = item.stock !== undefined?
    <Text>{JSON.stringify(item.stock)}</Text>:
    <Text>No hay nada en el stock</Text>
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={()=>{this.props.navigation.navigate('ReportList',item)}}
      >
        <Grid>
          <Row size={4} style={{marginTop:20}}>
            <Icon
                onPress={()=>{this.setState({showAlert: true,toBeDeleted:item.key})}}
                name="trash"
                size={35}
                color={'white'}
                style={{marginRight:90}}
              />
            <Icon
                onPress={()=>{this.props.navigation.navigate('UpdateTortilleria', item)}}
                name="edit"
                size={35}
                color={'white'}
              />
          </Row>
          <Row size={2}>
          <Tooltip popover={tooltip} withOverlay withPointer height={200}>
            <Text style={styles.itemText}>{item.name}</Text>
          </Tooltip>
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
            <FlatList
              data={formatData(this.props.tortillerias, numColumns)}
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
              this.props.deleteTortilleria(this.state.toBeDeleted);
              this.setState({showAlert: false,toBeDeleted:''})

            }}
            onDismiss={() => {
              this.setState({showAlert: false, toBeDeleted:''})
            }}
          />
          <FooterNav visible={true} addMethod={()=>{this.props.navigation.navigate('CrearTortilleria')}} style={styles.footer}/>
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
    backgroundColor: 'black',
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
    marginTop: '5%',
    marginLeft:'5%',
    marginRight:'5%',
    color: '#fff',
    fontSize: 18
  },
  footer: {
    position: 'absolute',
    bottom: 0
  },
});

const mapStateToProps = (state) => {
  return {
    tortillerias:state.sessionReducer.tortillerias,
    user:state.sessionReducer.user
  }
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(TortilleriasList);
