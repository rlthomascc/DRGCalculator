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
    const { closingCosts, viewChange } = this.props;
    return (
      <ScrollView>

        <View style={Styles.styles.container}>
          <Text style={Styles.styles.closingCosts}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Prepaid Costs: </Text>
            {'\n'}
            14 Months Of Insurance: $
            {closingCosts.prepaidInsurance.prepaidInsurance}
            {'\n'}
            2 Months Of Taxes: $
            {closingCosts.prepaidTaxes.prepaidTaxes}
            {'\n'}
            30 Days Of Interest: $
            {closingCosts.prepaidInterest.prepaidInterest}
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Title Fees: </Text>
            {'\n'}
            Lender's Title Policy: $
            {closingCosts.lendersTitlePolicy.lendersTitlePolicy}
            {'\n'}
            Escrow Fee: $
            {closingCosts.escrowFee.escrowFee}
            {'\n'}
            Endorsements: $25.00
            {'\n'}
            New Loan Services Fee: $340.00
            {'\n'}
            Notary Fee: $150.00
            {'\n'}
            Flood Cert: $22.00
            {'\n'}
            Whole House Inspection: $325.00
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Lender Fees: </Text>
            {'\n'}
            Origination Fee: $
            {closingCosts.origFee.origFee}
            {'\n'}
            Processing/Funding Fee: $400.00
            {'\n'}
            Credit Report: $65.00
            {'\n'}
            Home Inspection $65.00
            {'\n'}
            Application Fee: $295.00
            {'\n'}
            Termite Inspection: $125.00
            {'\n'}
            Appraisal: $450.00
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Other Fees: </Text>
            {'\n'}
            Prorated Tax Credit: -$
            {closingCosts.proratedTax.proratedTax}
            {'\n'}
            RecordingFee: $192.00

          </Text>
          <View style={Styles.styles.button}>
            <Button
              title="Go Back"
              onPress={() => viewChange('output')}
              color="white"
            />
          </View>
        </View>

      </ScrollView>
    );
  }
}

export default ClosingCosts;
