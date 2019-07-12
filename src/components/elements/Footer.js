import React, { Component } from 'react';
import {
  Header,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  View
 } from 'native-base';

export default class FooterNav extends Component {
  render() {
    if(this.props.visible) {
      return (
        <Footer>
            <FooterTab>
              <Button vertical onPress={()=>{
                this.props.addMethod()
              }}>
                <Icon name="ios-add" />
                <Text>Nueva</Text>
              </Button>
              <Button vertical>
                <Icon name="save" />
                <Text>Guardar</Text>
              </Button>
              <Button vertical>
                <Icon name="person" />
                <Text>Empleados</Text>
              </Button>
            </FooterTab>
        </Footer>
      );
    }
    else{return <View/>}
  }
}
