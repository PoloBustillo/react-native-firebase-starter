import * as React from "react";
import { Button, View, Text} from "react-native";
import firebase from 'react-native-firebase'
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import Nav from '../navigation/Nav';

class Settings extends React.Component {

  render() {
    return (
      <View>
      <Nav
        title='About'
        navigation={this.props.navigation}
        leftIcon={{
        type: 'ionicon',
        name: 'md-list',
        size: 26,
        }} />
        <Text>
        Nomina
        	Nombre
        	Deuda
        	Tortilleria
          Salario

        Stock por tortilleria

        Masa que entra al dia en kg
        Harina Stock
        Masa fria

        Productos
        •	Salsas grandes
        •	Salsas chicas
        •	Totopo Grande
        •	Totopo Chico
        •	Tortilla Harina
        •	Derivados
        •	Guisados
        •	Chicharron



        Cuentas por tortillaria

        •	Costal de harina tiene 20kg
        •	Sacar total en Masa
        o	1kg harina = 2.5 Masa


        Masa de Molino: masa que entra
        Masa de Harina: la que se saca de los costales de harina
        Masa Fria: Masa del dia anterior
        Masa sobrante: la que sobra del dia
        Totilla Sobrante en pesos

        Precio de masa por kilo alrededor de 13.4

        Reporte
        Dinero: (Masa Molino + Masa de Harina + Masa Fria - Masa Sobrante)* Precio de masa por kilo en ese dia + Productos Vendidos
        Tortilla Sobrante en pesos y Masa Sobrante actualizan cuenta siguiente

        La Masa Sobrante se transforma en masa fria de manana


        Reporte Bimensual
        •	Gastos
        Gastos imprevistos
        Luz
        Renta
        Telefona
        Agua
        Gas

        </Text>
      </View>
      )
    }
}


export default Settings;
