import React, { Component } from 'react'
import * as actionCreators from '../../actions';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import NumberFormat from 'react-number-format';
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
import InfoText from '../elements/InfoText';


class ReportInfo extends Component {

  state={
    masaMolino:0,
    masaHarina:0,
    masaSobrante:0,
    masaFria:0,
    tortillaAnterior:0,
    tortillaSobrante:0,
    total:0,
    stock:{},
    count:{},
    date:moment(new Date()).format("DD-MM-YYYY").toString()
  }
  componentDidMount(){
    this.setState({...this.props.navigation.state.params, count:{}});
    this.findReports(moment(new Date()).format("DD-MM-YYYY").toString());
  }

  updateTortilleria = (name,stock, id)=>{
    let newStock=stock;
    for(proCount in this.state.count){
      newStock[proCount]=newStock[proCount]-this.state.count[proCount]
    }
    var addDoc = firebase.firestore().collection('tortillerias').doc(id)
      .update({
        name: name,
        stock: newStock
      })
      .then(ref => {
        console.log('Updated document with ID: ', ref);
    });
  }

  findReports = (date)=>{
    let flag = this.props.navigation.state.params.reportes.some(
      function(element) {
        return element.fechaString === date;
    });
    this.setState({flagReport:flag});

    let yesterday = this.props.navigation.state.params.reportes.find(
      function(element) {
        return element.fechaString === moment(date, 'DD-MM-YYYY').subtract(1, 'days').format("DD-MM-YYYY").toString();
    });
    masaFria = yesterday===undefined?0: yesterday.masaSobrante
    tortillaAnterior = yesterday===undefined?0: yesterday.tortillaSobrante
    this.setState({yesterdayReport:yesterday});
    this.setState({masaFria:masaFria});
    this.setState({tortillaAnterior:tortillaAnterior});
    this.setState({flagReport:flag});
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
          {" "}{item.name}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderContent(item) {
    return (
      <Grid style={{marginTop:10}}>
        <Col size={1}>
        </Col>
        <Col size={3}>
          <Text style={{ fontWeight: "600" }}>
            Inventario
          </Text>
          <Text style={{ fontWeight: "600" }}>
            {`${this.state.stock[item.name]} ${item.name}`}
          </Text>
        </Col>
        <Col size={3}>
          <Text style={{ fontWeight: "600" }}>
            Vendidos
          </Text>
          <NumericInput
            value={this.state.count[item.name]}
            totalWidth={120}
            onChange={
              (value)=>{
                let temp = {...this.state.count,[item.name]:value}
                this.setState({count:temp})
              }
            }
            totalHeight={40}
            iconSize={25}
            step={1}
            valueType='integer'
            rounded
            textColor='#B0228C'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#EA3788'
            leftButtonBackgroundColor='#E56B70'/>
        </Col>
        <Col size={3}>
          <Text style={{ fontWeight: "600", marginLeft:10}}>
            {`Total
              ${this.state.stock[item.name]}-${this.state.count[item.name]===undefined?0:this.state.count[item.name]}`
            }
          </Text>
        </Col>

      </Grid>
    );
  }


  renderDetail = () => {
    return (
      <View>
        <Text style={styles.descriptionText}>Masa Molino[kg]:</Text>
        <NumericInput
          value={this.state.masaMolino}
          onChange={value => this.setState({masaMolino:value})}
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
        <Text style={styles.descriptionText}>Harina [kg]:</Text>
        <NumericInput
          value={this.state.masaHarina}
          onChange={value => this.setState({masaHarina:value})}
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
      </View>
    )
  }

  renderDetail2 = () => {
    return (
      <View>
      <Text style={styles.descriptionText}>Tortilla[Pesos]:</Text>
      <NumericInput
        value={this.state.tortillaSobrante}
        onChange={value => this.setState({tortillaSobrante:value})}
        totalWidth={150}
        totalHeight={40}
        iconSize={25}
        minValue={0}
        step={.5}
        valueType='real'
        rounded
        textColor='#B0228C'
        iconStyle={{ color: 'white' }}
        rightButtonBackgroundColor='#EA3788'
        leftButtonBackgroundColor='#E56B70'/>
        <Text style={styles.descriptionText}>Masa Sobrante[kg]:</Text>
        <NumericInput
          value={this.state.masaSobrante}
          onChange={value => this.setState({masaSobrante:value})}
          totalWidth={150}
          totalHeight={40}
          iconSize={25}
          minValue={0}
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

  calcularCuenta = ()=>{
    let harinaDinero = this.state.masaHarina*2.5*this.props.costoMasa;
    let masaMolinoDinero = this.state.masaMolino*this.props.costoMasa;
    let masaFriadDinero = this.state.masaFria*this.props.costoMasa;
    let masaSobranteDinero = this.state.masaSobrante*this.props.costoMasa;
    let tortillaDinero=this.state.tortillaAnterior-this.state.tortillaSobrante
    console.warn(this.state.productosCuenta);
    return(
      harinaDinero+masaMolinoDinero+masaFriadDinero-masaSobranteDinero+tortillaDinero
    )
  }
  renderDescription = () => {
    return (
      <View>
        <Text  style={styles.priceText}>
        <NumberFormat
          renderText={value => <Text>{value}</Text>}
          decimalScale={2}
          fixedDecimalScaler
          value={this.calcularCuenta()}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'} />
        </Text>
      </View>
    )
  }

  render() {
    console.warn(this.state.stock);
    if(!this.state.flagReport){
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
          <DatePicker
           style={{width: 200, marginLeft:60}}
           date={this.state.date}
           mode="date"
           placeholder="Fecha de reporte"
           format="DD-MM-YYYY"
           minDate="25-07-2019"
           confirmBtnText="Confirm"
           cancelBtnText="Cancel"
           customStyles={{
             dateIcon: {
               position: 'absolute',
               left: 8,
               top: 4,
               marginLeft: 40
             },
             dateInput: {
               marginLeft: 40
             }
             // ... You can check the source to find the other keys.
           }}
           onDateChange={(date) => {
             this.setState({date: date});
             this.findReports(date);
         }}
         />
          <Grid>
            <Col size={7}>
              <View style={styles.productRow}>{this.renderDetail()}</View>
            </Col>
            <Col size={1}/>
            <Col size={7}>
              <View style={styles.productRow}>{this.renderDetail2()}</View>
            </Col>
          </Grid>
          <Content padder style={{ backgroundColor: "white" }}>
           <Accordion
             dataArray={this.props.productos}
             animation={true}
             expanded={true}
             renderHeader={this._renderHeader}
             renderContent={this._renderContent.bind(this)}
           />
          </Content>
          <InfoText text={`Masa Fria: ${this.state.masaFria}`} style={styles.container}/>
          <InfoText text={`Tortilla ayer ($): ${this.state.tortillaAnterior}`}style={styles.container}/>
          <View style={styles.productRow}>{this.renderDescription()}</View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter} onPress={()=>{
            this.props.navigation.goBack(null);
            this.updateTortilleria(this.state.name,
              this.state.stock, this.state.key)
          }}>
            <Text style={styles.textFooter}>GUARDAR</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter} onPress={()=>{
            this.props.navigation.goBack(null);
          }}>
            <Text style={styles.textFooter}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
    }else{
      return(
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
            <DatePicker
             style={{width: 200, marginLeft:60}}
             date={this.state.date}
             mode="date"
             placeholder="Fecha de reporte"
             format="DD-MM-YYYY"
             minDate="25-07-2019"
             confirmBtnText="Confirm"
             cancelBtnText="Cancel"
             customStyles={{
               dateIcon: {
                 position: 'absolute',
                 left: 8,
                 top: 4,
                 marginLeft: 40
               },
               dateInput: {
                 marginLeft: 40
               }
               // ... You can check the source to find the other keys.
             }}
             onDateChange={(date) => {
               this.setState({date: date});
               this.findReports(date);
           }}
           />
           <Text style={styles.detailText}>Reporte para este dia ya existe!!</Text>
        </ScrollView>
      </View>
      );
    }
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

const mapStateToProps = (state) => {
  return {
    productos:state.settingsReducer.productos,
    tortillerias:state.sessionReducer.tortillerias,
    costoMasa:state.settingsReducer.costoMasa,
  }
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportInfo);
