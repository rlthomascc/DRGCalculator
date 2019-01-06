import React, { Component } from 'react';
import Styles from '../styling/styles';
import { View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    } from 'react-native';
import t from 'tcomb-form-native';
import Big from 'big.js';


const Form = t.form.Form;
        const options = {
          fields: {
            maxFHA: {
                label: 'Max FHA',
            },
            homePrice:{
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
        }
        }

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
        }


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
        const { viewChange, downChange } = this.props
        let decimal = down.slice(0, -1)
        let percent = decimal / 100;
        let downPayment = Math.round(home * percent);
        let final = downPayment.toLocaleString()
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

    calculateAll = (home, down, taxes, insurance, interest) => {
        const { changeTaxes, changeInsurance, changePAndL } = this.props;

        //TAXES
        let taxesDecimal = taxes.slice(0, -1);
        let taxesPercent = taxesDecimal / 100;
        let taxesDifference = home * taxesPercent;
        let tax = taxesDifference / 12;
        let finalTaxes = tax.toLocaleString();
        let finalRoundedTaxes = Math.round(finalTaxes * 100) / 100 // <===== TAX OUTPUT
        changeTaxes(finalRoundedTaxes);

        //INSURANCE
        let insuranceDecimal = insurance.slice(0, -1);
        let insurancePercent = insuranceDecimal / 100
        let insuranceDifference = home * insurancePercent;
        let insure = insuranceDifference / 12;
        let final = insure.toLocaleString();
        let finalRoundedInsurance = Math.round(final * 100) / 100; // <==== INSURANCE OUTPUT
        changeInsurance(finalRoundedInsurance);

        //P AND L
        let PAndLDecimal = interest.slice(0, -1)
        let PAndLPercent = PAndLDecimal / 100
        let PAndLInterest = PAndLPercent / 12
        let PAndLMonthly = PAndLInterest * home
        let PAndLTotal = PAndLMonthly + finalRoundedInsurance + finalRoundedTaxes
        let PAndLTotalRounded = Math.round(PAndLTotal * 100) / 100
        changePAndL(PAndLTotalRounded);
    }


    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        this.calculateDownPayment(value.homePrice, value.downPayment)
        this.calculateAll(value.homePrice, value.downPayment, value.taxes, value.hazardInsurance, value.interestRate);
    }

    resetForm = () => {
        this.setState({
            view: 'form'
        })
    }

    form() {
        return (
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
    }

    render() {
        return (
            this.form()
        );
    }
}

export default InitialForm;