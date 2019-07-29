import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ListView } from 'react-native';
import moment from 'moment';
import Nav from '../navigation/Nav';
import * as actionCreators from '../../actions';
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
  CardItem
} from 'native-base';


class ReportList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.reportes,
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    console.warn(this.props.navigation.state.params);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Nav
          title={`Reportes ${this.props.navigation.state.params.name}`}
          navigation={this.props.navigation}
          leftIcon={{
          type: 'ionicon',
          name: 'md-list',
          size: 26,
          }} />
        <Content>
          <Card>
            <CardItem
              header
              button
              onPress={()=>{this.props.navigation.navigate('ReportInfo',{...this.props.navigation.state.params,reportes: this.props.reportes})}}>
              <Text>Crear un nuevo reporte</Text>
            </CardItem>
          </Card>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {moment.unix(data.fecha.seconds).format("MM/DD/YYYY")} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data.fecha.toString())}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reportes:state.sessionReducer.reportes
  }
}

const mapDispatchToProps = {
  ...actionCreators
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
