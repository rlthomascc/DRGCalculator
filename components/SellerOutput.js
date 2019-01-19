/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import PieChart from 'react-native-pie-chart';
import Styles from '../styling/styles';

class SellerOutput extends Component {
  constructor(props) {
    super(props);
  }

  output() {
    const {
      changeView, view,
      loan,
      salesPrice,
      balance,
      netAtClose,
      ownersTitlePolicy,
      escrowFee,
      countyTransferTax,
      buyersBrokersFee,
      listingBrokersFee,
      closingCosts,
      loanBal,
    } = this.props;

    const chart_wh = 185;
    const series1 = [salesPrice, balance, closingCosts, netAtClose];
    const sliceColor = ['#FF9800', '#2196F3', 'blue', '#FFEB3B'];
    console.log(loanBal, 'loanBal');
    return (
      <ScrollView>
        <View style={Styles.styles.output}>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
            />
          </View>


          <View style={Styles.styles.pieChart}>

            <StatusBar
              hidden
            />
            <PieChart
              chart_wh={chart_wh}
              series={series1}
              sliceColor={sliceColor}
              doughnut
              coverRadius={0.75}
              coverFill="#FFF"
            />
          </View>

          <Text style={Styles.styles.pieChartText}>


            <Text style={{ fontWeight: 'bold', color: '#FF9800', textAlign: 'center' }}>Sales Price: </Text>
        $
            {salesPrice.toLocaleString(2)}
            {'\n'}

            <Text style={{ fontWeight: 'bold', color: '#2196F3' }}>Balance: </Text>
                    $
            {balance.toLocaleString(2)}
            {'\n'}

            <Text
              style={{
                color: 'blue',
                textAlign: 'center',
                fontSize: 16,
                marginBottom: 50,
              }}
              onPress={() => changeView('closingCosts')}
            >
Closing Costs >
              {' '}
            </Text>
            $
            {closingCosts.toLocaleString(2)}
            {'\n'}
            {'\n'}

            <Text style={{ fontWeight: 'bold', color: '#FFEB3B' }}>Net At Close: </Text>
          $
            {(netAtClose - loanBal).toLocaleString(2)}
            {'\n'}
            {'\n'}

          </Text>


          <View style={Styles.styles.button}>
            <Button
              title="Reset Form"
              onPress={() => changeView('form')}
              backgroundColor="none"
            />
          </View>
        </View>
      </ScrollView>
    );
  }


  render() {
    return (
      this.output()
    );
  }
}

export default SellerOutput;
