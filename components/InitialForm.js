/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import t from 'tcomb-form-native';
import Styles from '../styling/styles';


const Form = t.form.Form;
const options = {
  fields: {
    maxFHA: {
      label: 'Max FHA',
    },
    homePrice: {
      label: 'Home Price',
      placeholder: 'Required',
    },
    downPayment: {
      label: 'Down Payment',
    },
    interestRate: {
      label: 'Interest Rate',
    },
    hazardInsurance: {
      label: 'Hazard Insurance',
    },
    hoa: {
      label: 'HOA',
    },
    closingDate: {
      label: 'Closing Date',
    },
  },
};

const User = t.struct({
  maxFHA: t.String,
  homePrice: t.Number,
  downPayment: t.String,
  interestRate: t.String,
  term: t.String,
  misc: t.maybe(t.Number),
  hazardInsurance: t.String,
  taxes: t.String,
  hoa: t.maybe(t.Number),
  closingDate: t.Date,
});

const value = {
  maxFHA: '$350,750',
  downPayment: '3.5%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};


class InitialForm extends Component {
  constructor(props) {
    super(props);
  }

  // calculateTaxes = (home, taxes) => {
  //     const { changeTaxes } = this.props;
  //     const decimal = taxes.slice(0, -1);
  //     let percent = decimal / 100;
  //     let difference = home * percent;
  //     let tax = difference / 12;
  //     let final = tax.toLocaleString();
  //     changeTaxes(Math.round(final * 100) / 100)
  // }

    calculateDownPayment = (home, down) => {
      const { viewChange, downChange } = this.props;
      const decimal = down.slice(0, -1);
      const percent = decimal / 100;
      const downPayment = Math.round(home * percent);
      const final = downPayment.toLocaleString();
      viewChange('output');
      downChange(final);
    }

    // calculateInsurance = (home, insurance) => {
    //     const { changeInsurance } = this.props
    //     let decimal = insurance.slice(0, -1);
    //     let percent = decimal / 100
    //     let difference = home * percent;
    //     let insure = difference / 12;
    //     let final = insure.toLocaleString();
    //     changeInsurance(Math.round(final * 100) / 100);
    // }

    calculateAll = (home, down, taxes, insurance, interest, term) => {
      const {
        changeTaxes, changeInsurance, changePAndL, changePrepaids,
      } = this.props;

      // TAXES
      const taxesDecimal = taxes.slice(0, -1);
      const taxesPercent = taxesDecimal / 100;
      const taxesDifference = home * taxesPercent;
      const tax = taxesDifference / 12;
      const finalTaxes = tax.toLocaleString();
      const finalRoundedTaxes = Math.round(finalTaxes * 100) / 100; // <===== TAX OUTPUT
      changeTaxes(finalRoundedTaxes);

      // INSURANCE
      const insuranceDecimal = insurance.slice(0, -1);
      const insurancePercent = insuranceDecimal / 100;
      const insuranceDifference = home * insurancePercent;
      const insure = insuranceDifference / 12;
      const final = insure.toLocaleString();
      const finalRoundedInsurance = Math.round(final * 100) / 100; // <==== INSURANCE OUTPUT
      changeInsurance(finalRoundedInsurance);

      // P AND I
      const PAndLDecimal = interest.slice(0, -1);
      const PAndLPercent = PAndLDecimal / 100;
      const PAndLInterest = PAndLPercent / 12;
      const PAndLMonthly = PAndLInterest * home;
      const PAndLTotal = PAndLMonthly + finalRoundedInsurance + finalRoundedTaxes;
      const PAndLTotalRounded = Math.round(PAndLTotal * 100) / 100;
      changePAndL(PAndLTotalRounded);

      // PREPAIDS
      const prepaidInterestPerc = interest.slice(0, -1);
      const prepaidInterestDec = prepaidInterestPerc / 100;
      const prepaidDownpaymentPerc = down.slice(0, -1);
      const prepaidDownpaymentDec = prepaidDownpaymentPerc / 100;
      const prepaidDownpayment = Math.round((home * prepaidDownpaymentDec) * 100 / 100);
      const prepaidPrincipal = home - prepaidDownpayment;
      const prepaidNumberPayments = term * 12;
      const prepaidInterest = Math.round(((prepaidInterestDec / prepaidNumberPayments) * prepaidPrincipal) * 100) / 100;
      const prepaidInterestTotal = prepaidInterest * 30; // <========= INTEREST
      const prepaidTaxDec = taxes.slice(0, -1);
      const prepaidTaxPerc = prepaidTaxDec / 100;
      const prepaidTaxDiff = home * prepaidTaxPerc;
      const prepaidTaxTotal = prepaidTaxDiff / 12;
      const prepaidTaxStr = prepaidTaxTotal.toLocaleString();
      const prepaidTaxesFinal = Math.round(prepaidTaxStr * 100) / 100;
      const prepaidTaxesTotal = prepaidTaxesFinal * 2; // <========= TAXES
      const prepaidInsuranceDec = insurance.slice(0, -1);
      const prepaidInsurancePerc = prepaidInsuranceDec / 100;
      const prepaidDifference = home * prepaidInsurancePerc;
      const prepaidInsurance = prepaidDifference / 12;
      const prepaidFinal = prepaidInsurance.toLocaleString();
      const prepaidFinalRounded = Math.round(prepaidFinal * 100) / 100;
      const prepaidInsuranceTotal = prepaidFinalRounded * 14; // <====== INSURANCE
      const Prepaids = prepaidInterestTotal + prepaidTaxesTotal + prepaidInsuranceTotal;
      changePrepaids(Prepaids);
    }


    handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      this.calculateDownPayment(value.homePrice,
        value.downPayment);
      this.calculateAll(value.homePrice,
        value.downPayment,
        value.taxes,
        value.hazardInsurance,
        value.interestRate,
        value.term);
    }

    form = () => (
      <ScrollView>
        <View style={Styles.styles.container}>
          <Form
            ref={c => this._form = c}
            type={User}
            options={options}
            value={value}
          />
          <View style={Styles.styles.button}>
            <Button
              title="Calculate"
              onPress={this.handleSubmit}
              color="white"
            />
          </View>
        </View>
      </ScrollView>
    )

    render() {
      return (
        this.form()
      );
    }
}

export default InitialForm;
