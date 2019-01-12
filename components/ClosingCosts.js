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
    const { closingCosts } = this.props;
    return (
      <ScrollView>

        <View style={Styles.styles.titleText}>
          <Text>
            Prepaid Costs:
            {'\n'}
            14 Months Of Insurance: $
            {closingCosts.prepaidInsurance}
            {'\n'}
            2 Months Of Taxes: $
            {closingCosts.prepaidTaxes}
            {'\n'}
            30 Days Of Interest: $
            {closingCosts.prepaidInterst}
            {'\n'}
            {'\n'}
            Title Fees:
            {'\n'}
            Lender's Title Policy: $
            {closingCosts.lendersTitlePolicy}
            {'\n'}
            Escrow Fee: $
            {closingCosts.escrowFee}
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
            Lender Fees:
            {'\n'}
            Origination Fee: $
            {closingCosts.origFee}
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
            Other Fees:
            {'\n'}
            Prorated Tax Credit: -$
            {closingCosts.proratedTax}
            {'\n'}
            RecordingFee: $192.00

          </Text>
        </View>

      </ScrollView>
    );
  }
}

// lendersTitlePoicy: { lendersTitlePolicy },
//         escrowFee: { escrowFee },
//         origFee: { origFee },
//         proratedTax: { proratedTax },
//         prepaidInsurance: { prepaidInsurance },
//         prepaidTaxes: { prepaidTaxes },
//         prepaidInterest: { prepaidInterest },

export default ClosingCosts;
