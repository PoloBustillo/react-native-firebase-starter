import React, { Component } from 'react';
import { ListView } from 'react-native';
import Nav from '../navigation/Nav';
import InfoText from '../elements/InfoText';
import NumericInput from 'react-native-numeric-input'
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Accordion
} from 'native-base';
const datas = [
  'Report id',
  'Report id',
  'Report id',
  'Report id',
];
export default class SettingsProducts extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
      costoMasa:0
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Nav
          title='Productos y precios'
          navigation={this.props.navigation}
          leftIcon={{
          type: 'ionicon',
          name: 'md-list',
          size: 26,
          }} />
        <Content>
          <InfoText text="Costo Masa"/>
          <Item style={{marginTop:10,marginBottom:10}}>
            <Col/>
            <NumericInput
              value={this.state.costoMasa}
              onChange={value => this.setState({costoMasa:value})}
              totalWidth={150}
              totalHeight={40}
              minValue={0}
              iconSize={25}
              step={.5}
              valueType='real'
              rounded
              textColor='#B0228C'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#EA3788'
              leftButtonBackgroundColor='#E56B70'/>
              <Col/>
          </Item>
          <Button full info style={{marginTop:20}}>
           <Text>CREAR NUEVO PRODUCTO</Text>
         </Button>
         <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={this.props.productos}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent.bind(this)}
          />
         </Content>
        </Content>
      </Container>
    );
  }
}
