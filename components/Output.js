/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
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

class Output extends Component {
  constructor(props) {
    super(props);
  }


  output = () => {
    const {
      viewChange, down, taxes, insurance, pAndL, prepaids, fixed, bringToClose, mip, loan, pmi,
    } = this.props;
    const chart_wh = 185;
    // FIGURE OUT HOW TO REMOVE COMMAS FROM ALL NUMBERS AND THE PIE CHART WILL WORK SUFFICENTLY
    const series1 = [down, prepaids, fixed];
    const series2 = [pAndL, insurance, taxes, mip];
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];
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


          <Text style={Styles.styles.pieChartText}>


            {'\n'}
            {'\n'}
            <Text style={{
              fontWeight: 'bold', color: '#cda135', textAlign: 'center', marginTop: 10,
            }}
            >
Monthly Payment:
              {' '}

            </Text>
        $
            {Math.round((pAndL + insurance + taxes + pmi) * 100) / 100}
            {'\n'}
          </Text>


          <View style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 10,
            alignItems: 'center',
          }}
          >

            <StatusBar
              hidden
            />
            <PieChart
              chart_wh={chart_wh}
              series={series2}
              sliceColor={sliceColor}
              doughnut
              coverRadius={0.75}
              coverFill="#FFF"
            />
          </View>


          <Text style={Styles.styles.pieChartText}>
            <Text style={{ fontWeight: 'bold', color: '#F44336' }}>P&I: </Text>
                    $
            {pAndL.toLocaleString(2)}
            {'\n'}
            <Text style={{ fontWeight: 'bold', color: '#2196F3' }}>Insurance: </Text>
                    $
            {insurance.toLocaleString(2)}
            {'\n'}
            <Text style={{ fontWeight: 'bold', color: '#FFEB3B' }}>Taxes: </Text>
                    $
            {taxes.toLocaleString(2)}
            {'\n'}
            {loan === 'FHA' ? <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>MIP: </Text> : loan === 'Conventional' ? <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>PMI: </Text> : undefined }
            $
            {loan === 'FHA' ? mip.toLocaleString(2) : loan === 'Conventional' ? pmi.toLocaleString(2) : undefined }
            {'\n'}

          </Text>


          <View>
            <Text
              style={{
                color: 'blue',
                textAlign: 'center',
                fontSize: 16,
                marginBottom: 30,
              }}
              onPress={() => viewChange('closingCosts')}
            >
Closing Costs >

            </Text>
          </View>

          {/* SEPERATING LINE */}
          <View
            style={{
              borderBottomColor: '#CDA135',
              borderBottomWidth: 1,
            }}
          />
          {/* SEPERATING LINE */}


          <View style={Styles.styles.pieChart}>

            <Text style={Styles.styles.pieChartText}>

              <Text style={{ fontWeight: 'bold', color: '#cda135', textAlign: 'center' }}>Bring To Close: </Text>
        $
              {bringToClose.toLocaleString(2)}
              {'\n'}
            </Text>
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

            <Text style={{ fontWeight: 'bold', color: '#F44336' }}>Down Payment: </Text>
                    $
            {down.toLocaleString(2)}
            {'\n'}

            <Text style={{ fontWeight: 'bold', color: '#2196f3' }}>Prepaids: </Text>
          $
            {prepaids.toLocaleString(2)}
            {'\n'}
            <Text style={{ fontWeight: 'bold', color: '#ffeb3b' }}>Fixed: </Text>
          $
            {fixed.toLocaleString(2)}
            {'\n'}
            {'\n'}
          </Text>


          <View style={Styles.styles.button}>
            <Button
              title="Reset Form"
              onPress={() => viewChange('form')}
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

export default Output;
