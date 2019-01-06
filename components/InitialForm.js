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

    calculateTaxes = (home, taxes) => {
        const { changeTaxes } = this.props;
        const decimal = taxes.slice(0, -1);
        let percent = decimal / 100;
        let difference = home * percent;
        let tax = difference / 12;
        let final = tax.toLocaleString();
        changeTaxes(Math.round(final * 100) / 100)
    }

    calculateDownPayment = (home, down) => {
        const { viewChange, downChange } = this.props
        let decimal = down.slice(0, -1)
        let percent = decimal / 100;
        let downPayment = Math.round(home * percent);
        let final = downPayment.toLocaleString()
        viewChange('output');
        downChange(final);
    }

    calculateInsurance = (home, insurance) => {
        const { changeInsurance } = this.props
        let decimal = insurance.slice(0, -1);
        let percent = decimal / 100
        let difference = home * percent;
        let insure = difference / 12;
        let final = insure.toLocaleString();
        changeInsurance(Math.round(final * 100) / 100);
    }

    // calculatePAndL = (home, term, int, down) => {
    //     //NOT 100% ACCURATE!!!! NEEDS WORK!!!
    //     const { changePAndL } = this.props
    //     let decimal = down.slice(0, -1);
    //     let percent = decimal / 100;
    //     let downPayment = home * percent;
    //     let principal = home - downPayment;
    //     let n = term * 12;
    //     let r = int.slice(0, -1) / 12
    //     let rRounded = Math.round(r * 100) / 100
    //     let topParen = 1 + rRounded
    //     let topParenRound = Math.round(topParen * 100) / 100
    //     let topPow = Math.pow(topParenRound, n);
    //     let topPower = JSON.stringify(topPow)
    //     let topPowStr = topPower.slice(0, -4)
    //     let topPowRound = Math.round(topPowStr * 100 ) / 100
    //     let topSolution = rRounded * topPowRound
    //     let bottomParen = 1 + rRounded
    //     let bottomParenRound = Math.round(bottomParen * 100) / 100
    //     let bottomPow = Math.pow(bottomParenRound, n);
    //     let bottomPower = JSON.stringify(bottomPow);
    //     let bottomPowerStr = bottomPower.slice(0, -4);
    //     let bottomPowRound = Math.round(bottomPowerStr * 100) / 100;
    //     let bottomSolution = bottomPowRound - 1
    //     let formulaTotal = topSolution / bottomSolution
    //     let formulaRound = Math.round(formulaTotal * 100) / 100;
    //     let solution = principal * formulaRound;
    //     let solutionStr = JSON.stringify(solution);
    //     let solutionArr = solutionStr.split('');
    //     solutionArr.splice(-2, 0, '.')
    //     let pAndL = solutionArr.join("")
    //     console.log(pAndL)
    //     //NOT 1000% ACCURATE!!! NEEDS WORK!!!
    // }

    calculatePAndL = (home, term, int, down) => {
        console.log('P&L NEEDS WORK')
    }

    strip = (number) => {
        let num = parseFloat(number).toPrecision(12)
        console.log(num);
    }

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        this.calculateDownPayment(value.homePrice, value.downPayment)
        this.calculateTaxes(value.homePrice, value.taxes);
        this.calculateInsurance(value.homePrice, value.hazardInsurance);
        this.calculatePAndL(value.homePrice, value.term, value.interestRate, value.downPayment);
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