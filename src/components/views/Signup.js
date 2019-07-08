import * as React from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";
//import Button from "./Button";
import FormTextInput from "../elements/FormTextInput";
import Button from "../elements/Button";
import FBLoginButton from '../elements/FBLoginButton';
import colors from "../../config/colors";
import strings from "../../config/strings";
import constants from "../../config/constants";
import { StatusBar } from 'react-native';
import firebase from 'react-native-firebase'

//TODO: handle error MSGs
export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Home',
    /* No more header config here! */
  };
  passwordInputRef = React.createRef();

  state = {
    email: "",
    password: "",
    emailTouched: false,
    passwordTouched: false
  };


  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };

  handleLoginPress = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      //TODO: add user to redux and handle error
      .then((user) =>{})
      .catch(error => {this.setState({ errorMessage: error.message })})
  };

  render() {
    const {
      email,
      password,
      emailTouched,
      passwordTouched
    } = this.state;
    // Show the validation errors only when the inputs
    // are empty AND have been blurred at least once
    const emailError =
      !email && emailTouched
        ? strings.EMAIL_REQUIRED
        : undefined;
    const passwordError =
      !password && passwordTouched
        ? strings.PASSWORD_REQUIRED
        : undefined;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={constants.IS_IOS ? "padding" : undefined}
      >
        <Image source={require('../../takitoWait.gif')}  style={styles.logo}/>
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder={strings.EMAIL_PLACEHOLDER}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize={"none"}
            onBlur={this.handleEmailBlur}
            error={emailError}
          />
          <FormTextInput
            ref={this.passwordInputRef}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            returnKeyType="done"
            onBlur={this.handlePasswordBlur}
            error={passwordError}
          />
          <Button
            label={strings.LOGIN}
            onPress={()=>this.handleLoginPress(this.state.email, this.state.password)}
            disabled={!email || !password}
          />
          <FBLoginButton navigation={this.props.navigation}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});
