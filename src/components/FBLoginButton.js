import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FBLoginButton extends Component {

  loginAction = async ()=>{
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }
      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      //TODO: check if user is valid to see content
      firebaseUserCredential.displayName
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))

    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    return (
      <View>
        <Button
          onPress={()=>{this.props.navigation.navigate('Loading'); this.loginAction()}}
          style={styles.FBLoginButton}
          icon={
            <Icon
              name="facebook-square"
              size={35}

            />
          }
          type='outline'
          raised={true}
          title="   Accede con Facebook"
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  FBLoginButton: {
    flex:1,
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 8
  }
});
