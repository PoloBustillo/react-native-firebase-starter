import React from "react";
import { StyleSheet, Image, StatusBar,  } from "react-native";
import { DrawerItems } from "react-navigation";
import colors from "../../config/colors";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
const routes = ["Home", "Settings", "About"];

export default class CustomDrawerNavigator extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
          source={require('../../corgiSwim.gif')}
          style={{
            height: 160,
            width: "100%",
            alignSelf: "stretch",
            position: "absolute"
          }} />
          <DrawerItems
            activeBackgroundColor={colors.MISCHKA}
            activeTintColor={colors.BLUE}
            iconContainerStyle={styles.icons}
            itemsContainerStyle={{marginTop:160}}
            {...this.props}
          />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({

  icons: {
    width: 30
  }
});
