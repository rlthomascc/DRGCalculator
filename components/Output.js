/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';
import Styles from '../styling/styles';

class Output extends Component {
  constructor(props) {
    super(props);
  }


  output() {
    const {
      viewChange, down, taxes, insurance, pAndL, prepaids,
    } = this.props;
    return (
      <View>
        <Text style={Styles.styles.titleText}>
                    Down Payment:
                    $
          {down}
          {'\n'}
                    P&I:
                    $
          {pAndL}
          {'\n'}
                    Taxes:
                    $
          {taxes}
          {'\n'}
                    Insurance:
                    $
          {insurance}
          {'\n'}
          Prepaids:
          $
          {prepaids}
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
