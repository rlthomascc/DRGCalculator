/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  Image,
} from 'react-native';
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
      <View style={{
        paddingTop: 130,
      }}
      >

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

        Bring To Close:
        $
          {bringToClose}
          {'\n'}

        Down Payment:
                    $
          {down}
          {'\n'}

          Prepaids:
          $
          {prepaids}
          {'\n'}
          Fixed:
          $
          {fixed}


        </Text>

        <View>
          <Button
            title="Closing Costs >"
            onPress={() => viewChange('closingCosts')}
            color="blue"
          >
CLOSING COST LINK

          </Button>
        </View>


        <Text style={Styles.styles.titleText}>
                    P&I:
                    $
          {pAndL}
          {'\n'}
                    Insurance:
                    $
          {insurance}
          {'\n'}
                    Taxes:
                    $
          {taxes}
          {'\n'}
                    MIP:
          {mip}
          {'\n'}

        </Text>


        <View style={Styles.styles.button}>
          <Button
            title="Reset Form"
            onPress={() => viewChange('form')}
            color="white"
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
