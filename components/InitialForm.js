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


const Form = t.form.Form;
        const options = {
          fields: {
            maxFHA: {
                label: 'Max FHA',
            },
            homePrice:{
                label: 'Home Price',
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
            term: '30 years',
            hazardInsurance: '0.35%',
            taxes: '1.25%',
        }


class InitialForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            down: '',
        }
    }

    calculateDownPayment = (home, down) => {
        const { viewChange, downChange } = this.props
        let decimal = down.slice(0, -1)
        let percent = decimal / 100;
        let downPayment = Math.round(home * percent);
        let final = downPayment.toLocaleString()
        viewChange('output')
        downChange(final)
    }

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value ', value);
        this.calculateDownPayment(value.homePrice, value.downPayment)
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