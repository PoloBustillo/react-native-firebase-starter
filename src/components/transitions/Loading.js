import React from 'react';
import {connect} from 'react-redux';
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

class Loading extends React.Component {

  _isMounted = false;
  componentDidMount(){
    this._isMounted = true;
    var random = Math.random() * (4000 - 1000) + 1000;
    setTimeout(()=>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('Main')
        }else {
          this.props.navigation.navigate('SignUp')
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
      count: 0,
      showText:''
    }
    Animated.loop(Animated.timing(
      this.state.spinValue,
      {
        toValue: 1000,
        duration: 1000,
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

}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
