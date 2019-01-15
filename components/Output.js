/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import Styles from '../styling/styles';

class Output extends Component {
  constructor(props) {
    super(props);
  }


  output = () => {
    const {
      viewChange, down, taxes, insurance, pAndL, prepaids, fixed, bringToClose, mip,
    } = this.props;
    return (
      <View style={Styles.styles.container}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 10,
        }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
          />
        </View>

        <Text style={Styles.styles.titleText}>

          <Text style={{ fontWeight: 'bold' }}>Bring To Close: </Text>
        $
          {bringToClose}
          {'\n'}

          <Text style={{ fontWeight: 'bold' }}>Down Payment: </Text>
                    $
          {down}
          {'\n'}

          <Text style={{ fontWeight: 'bold' }}>Prepaids: </Text>
          $
          {prepaids}
          {'\n'}
          <Text style={{ fontWeight: 'bold' }}>Fixed: </Text>
          $
          {fixed}


        </Text>

        <View>
          <Text
            style={{
              color: 'blue',
              paddingLeft: 20,
              fontSize: 16,
            }}
            onPress={() => viewChange('closingCosts')}
          >
Closing Costs >

          </Text>
        </View>


        <Text style={Styles.styles.titleText}>
          <Text style={{ fontWeight: 'bold' }}>P&I: </Text>
                    $
          {pAndL}
          {'\n'}
          <Text style={{ fontWeight: 'bold' }}>Insurance: </Text>
                    $
          {insurance}
          {'\n'}
          <Text style={{ fontWeight: 'bold' }}>Taxes: </Text>
                    $
          {taxes}
          {'\n'}
          <Text style={{ fontWeight: 'bold' }}> MIP: </Text>
          {mip}
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
    );
  }


  render() {
    return (
      this.output()
    );
  }
}

export default Output;
