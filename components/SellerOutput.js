import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Style from '../styling/styles';

class SellerOutput extends Component {
  render() {
    return (
      <View style={Style.styles.titleText}>
        <Text>Seller Output</Text>
      </View>
    );
  }
}

export default SellerOutput;
