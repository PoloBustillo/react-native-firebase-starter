import * as React from "react";
import { Button, View} from "react-native";
import firebase from 'react-native-firebase'
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import CustomHeader from '../navigation/CustomHeader';


class Home extends React.Component {

  render() {
    return (
      <View>
        <CustomHeader navigation={this.props.navigation} />
        <Button title="Home" onPress={console.log('pressing')} />
      </View>
      )
    }
}


export default Home;
