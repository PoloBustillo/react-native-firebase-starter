import React, { Component } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem, Input, Slider} from 'react-native-elements'
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import BaseIcon from '../elements/BaseIcon'
import Chevron from '../elements/Chevron'
import InfoText from '../elements/InfoText'
import Nav from '../navigation/Nav';

class Settings extends Component {

  state = {
    pushNotifications: true,
  }

  renderCuenta = ()=>{
    const displayName = 'Usuario'
    const photoURL=''
    const email ='email'

    if(this.props.user !== null)
    {
      const {displayName,photoURL,email} = this.props.user;
    }
    return(
      <View>
        <ListItem
          hideChevron
          title="Notificaciones"
          containerStyle={styles.listItemContainer}
          rightElement={
            <Switch
              onValueChange={this.onChangePushNotifications}
              value={this.state.pushNotifications}
            />
          }
          badge={{
            value: 0,
            textStyle: { color: 'white' },
            containerStyle: { backgroundColor: 'gray', marginTop: 0 },
          }}
          leftIcon={
            <BaseIcon
              containerStyle={{
                backgroundColor: '#FFADF2',
              }}
              icon={{
                type: 'material',
                name: 'notifications',
              }}
            />
          }
        />
        <ListItem
          // chevron
          hideChevron
          onPress={()=>{this.props.navigation.navigate('SettingsProducts')}}
          title="Actualizar Costo [Productos, Masa]"
          rightTitleStyle={{ fontSize: 15 }}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon={
            <BaseIcon
              containerStyle={{ backgroundColor: '#FAD291' }}
              icon={{
                type: 'font-awesome',
                name: 'money',
              }}
            />
          }
        />
        <ListItem
          title="Cuentas Costales"
          onPress={() => this.onPressOptions()}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <BaseIcon
              containerStyle={{ backgroundColor: '#FEA8A1' }}
              icon={{
                type: 'material',
                name: 'folder',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
      </View>
    )
  }
  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }

  render() {
    const displayName = 'Usuario'
    const photoURL=''
    const email ='email'

    if(this.props.user !== null)
    {
      const {displayName,photoURL,email} = this.props.user;
    }
    return (
      <ScrollView style={styles.scroll}>
        <Nav
          title='Configuraciones'
          navigation={this.props.navigation}
          leftIcon={{
          type: 'ionicon',
          name: 'md-list',
          size: 26,
          }} />
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              title = {displayName[0]}
              source= {{uri: photoURL }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{displayName}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        <InfoText text="Cuenta" />
        {this.renderCuenta()}
        <InfoText text="More" />
        <View>
          <ListItem
            title="Info Empleados"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Otros"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Asistencia Tecnica"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})

const mapStateToProps = (state) => {
  return {
    user:state.sessionReducer.user
  }
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
