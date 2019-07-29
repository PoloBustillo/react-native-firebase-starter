import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Button,
  Image
} from 'react-native';
import logo from '../../logo.png';
import firebase from 'react-native-firebase'
import { BackHandler } from "react-native";

class Loading extends React.Component {
  _isMounted = false;

  handleBackButton= ()=>{
    this.props.navigation.popToTop();
    return true;
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    this._isMounted = true;
    var random = Math.random() * (2000 - 500) + 500;
    setTimeout(()=>
      firebase.auth().onAuthStateChanged((user) => {
        if(this.props.navigation.state.params!==undefined
         && this.props.navigation.state.params.view==='report'){
          this.props.navigation.navigate('ReportList',this.props.navigation.state.params)
        }
        if (user) {
          this.props.navigation.navigate('Main')
        }else {
          this.props.navigation.navigate('Main')
        }
     }), random);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  constructor(props){
    super(props);
    this.state = {
      spinValue: new Animated.Value(1),
    }
    Animated.loop(Animated.timing(
      this.state.spinValue,
      {
        toValue: 2000,
        duration: 2000,
        easing: Easing.linear
      }
    )).start()
  }


  render(){
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return(
      <View style={styles.container}>
          <Animated.Image source={logo} style={[styles.logo, { transform: [{rotate: spin}] }]}/>
          <Image source={require('../../loadingCorgi.gif')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0066',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  text: {
    color: 'white',
    fontSize: 40,
  }
});

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
