/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Text, View, ScrollView, Button, ListView,
} from 'react-native';
import Styles from '../styling/styles';

class ClosingCosts extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      changeView,
      ownersTitlePolicy,
      escrowFee,
      countyTransferTax,
      buyersBrokerFee,
      listingBrokersFee,
      closingCosts,
    } = this.props;
    return (
      <ScrollView>

        <View style={Styles.styles.container}>
          <Text style={Styles.styles.SellerClosingCosts}>
            <Text style={{ fontStyle: 'italic' }}>
Total Closing Costs:
              {'                    '}
            $
              {closingCosts.toLocaleString(2)}
            </Text>
            {'\n'}
          </Text>
          {/* SEPERATING LINE */}
          <View
            style={{
              borderBottomColor: '#CDA135',
              borderBottomWidth: 1,
            }}
          />
          {/* SEPERATING LINE */}
          <Text style={{
            marginTop: 20,
            paddingLeft: 20,
            fontSize: 14,
          }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#cda135' }}>Title Fees: </Text>
            {'\n'}
            Owner's Title Policy: $
            {ownersTitlePolicy.toLocaleString(2)}
            {'\n'}
            Escrow Fee: $
            {escrowFee.toLocaleString(2)}
            {'\n'}
            Natural Hazard Disclosure: $99.00
            {'\n'}
            Noraty Fee: $150.00
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#cda135' }}>Other Fees: </Text>
            {'\n'}
            County Transfer Tax: $
            {countyTransferTax.toLocaleString(2)}
            {'\n'}
            Recording Fee: $70.00
            {'\n'}
            Broker Fee (Split Between Agents): $
            {(buyersBrokerFee + listingBrokersFee).toLocaleString(2)}
            {'\n'}
            {'\n'}

          </Text>
          <View style={Styles.styles.button}>
            <Button
              title="Go Back"
              onPress={() => changeView('output')}
              color="white"
            />
          </View>
        </View>

      </ScrollView>
    );
  }
}

export default ClosingCosts;
