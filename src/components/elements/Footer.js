import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

export default class FooterNav extends Component {

  addNewTortilleria = ()=>{console.warn('new Tortilleria');}
  render() {
    return (
      <Footer>
          <FooterTab>
            <Button vertical onPress={()=>{}}>
              <Icon name="ios-add" />
              <Text>Nueva</Text>
            </Button>
            <Button vertical>
              <Icon name="save" />
              <Text>Guardar</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Navegar</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Empleados</Text>
            </Button>
          </FooterTab>
      </Footer>
    );
  }
}
