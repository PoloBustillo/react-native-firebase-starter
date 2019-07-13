import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import {Form, Item, Input, Label, Content, Accordion, Icon} from 'native-base';
import NumericInput from 'react-native-numeric-input'
import colors from "../../config/colors";
import Nav from '../navigation/Nav';
import FooterNav from '../elements/Footer'
import { Col, Row, Grid } from "react-native-easy-grid";
import PhotoButton from '../elements/PhotoButton'

const dataArray = [
  { title: "Salsa Grande"},
  { title: "Salsa Chica"},
  { title: "Totopo Chico"},
  { title: "Totopo Grande"},
  { title: "Tortilla Harina"},
  { title: "Derivados"},
  { title: "Guisados"},
  { title: "Chicharron"}
];


class ReportInfo extends Component {

  state={
    masaMolino:'',
    masaHarina:'',
    masaSobrante:'',
    tortillaSobrante:''
  }

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#A9DAD6" }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.descriptionText}>Masa Molino:</Text>
        <NumericInput
          value={this.state.masaMolino}
          onChange={value => this.setState({masaMolino:value})}
          totalWidth={150}
          totalHeight={40}
          iconSize={25}
          step={.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        <Text style={styles.descriptionText}>Masa Harina:</Text>
        <NumericInput
          value={this.state.masaHarina}
          onChange={value => this.setState({masaHarina:value})}
          totalWidth={150}
          totalHeight={40}
          iconSize={25}
          step={.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        <Text style={styles.descriptionText}>Masa Sobrante:</Text>
        <NumericInput
          value={this.state.masaSobrante}
          onChange={value => this.setState({masaSobrante:value})}
          totalWidth={150}
          totalHeight={40}
          iconSize={25}
          step={.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        <Text style={styles.descriptionText}>Tortilla Sobrante (en pesos):</Text>
        <NumericInput
          value={this.state.tortillaSobrante}
          onChange={value => this.setState({tortillaSobrante:value})}
          totalWidth={150}
          totalHeight={40}
          iconSize={25}
          step={.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>

      </View>
    )
  }

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.priceText}>$1,175,000</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    console.warn(navigation);
    console.warn(item);
    return (
      <View style={styles.mainviewStyle}>
        <Nav
          title={`Reporte de ${this.props.navigation.state.params.name}`}
          navigation={this.props.navigation}
          leftIcon={{
          type: 'ionicon',
          name: 'md-list',
          size: 26,
          }} />
        <ScrollView style={styles.scroll}>
          <Grid>
            <Col size={7}>
              <View style={styles.productRow}>{this.renderDetail()}</View>
            </Col>
            <Col size={1}/>
            <Col size={7}>
              <View style={styles.productRow}>{this.renderDetail()}</View>
            </Col>
          </Grid>
          <Content padder style={{ backgroundColor: "white" }}>
           <Accordion
             dataArray={dataArray}
             animation={true}
             expanded={true}
             renderHeader={this._renderHeader}
             renderContent={this._renderContent}
           />
          </Content>
          <View style={styles.productRow}>{this.renderDescription()}</View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter} onPress={()=>{this.props.navigation.navigate('ReportInfo')}}>
            <Text style={styles.textFooter}>GUARDAR</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  scroll: {
    backgroundColor: '#FFF',
    flex: 1,
    marginBottom: 55,
  },
  productRow: {
    margin: 25,
  },
  mainviewStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F64A25',
    flexDirection: 'row',
    height: 65,
    alignItems: 'center',
  },
  buttonFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navigatorButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  navigatorText: {
    color: colors.GREEN,
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'center',

    fontSize: 16,
  },
  borderCenter: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#FFA890',
  },
  textFooter: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18,
  },
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,

    color: colors.BLACK,
    fontSize: 36,
    fontWeight: '400',
  },
  detailText: {
    marginBottom: 2,
    color: colors.black,
    fontSize: 19,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subDetailText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 4,
    color: colors.GRAY,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
});
export default ReportInfo
