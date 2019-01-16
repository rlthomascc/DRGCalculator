/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, Button,
} from 'react-native';
import Style from '../styling/styles';

class SellerOutput extends Component {
  constructor(props) {
    super(props);
  }

  renderView() {
    const { changeView } = this.props;
    return (
      <ScrollView>
        <View style={Style.styles.container}>

          <View>
            <Text style={Style.styles.titleText}>Seller Output</Text>
          </View>

          <View style={Style.styles.button}>
            <Button
              title="Reset Form"
              onPress={() => changeView('form')}
              color="white"
            />
          </View>


        </View>
      </ScrollView>
    );
  }


  render() {
    return (
      this.renderView()
    );
  }
}

export default SellerOutput;
