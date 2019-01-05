import React, { Component } from 'react';
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

        const styles = StyleSheet.create({
            container: {
                justifyContent: 'center',
                backgroundColor: 'white',
                marginTop: 50,
                padding: 20,
                width: 320,
            },
            button: {
                justifyContent: 'center',
                backgroundColor: '#0f87fe',
                margin: 10,
                padding: 10,
            },
            titleText: {
                fontSize: 25,
                fontWeight: "bold",
            }
        })



class InitialForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            down: '',
            view: 'form'
        }
    }

    calculateDownPayment = (home, down) => {
        let decimal = down.slice(0, -1)
        let percent = decimal / 100;
        let downPayment = Math.round(home * percent);
        let final = downPayment.toLocaleString()
        this.setState({
            down: final,
            view: 'output'
        });
    }

    total() {
        const { down } = this.state;
        return (
            <View>
                <Text style={styles.titleText}>
                    Down Payment:
                    ${down}
                </Text>
                <View style={styles.button}>
                <Button
                title="Reset Form"
                onPress={this.resetForm}
                color="white"
                />
                </View>
            </View>
            )
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
            <View style={styles.container}>
                <Form
                ref={c => this._form = c}
                type={User}
                options={options}
                value={value}
                />
                <View style={styles.button}>
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

    renderView = () => {
        if (this.state.view === 'form') {
            return ( this.form() )
        }
        if (this.state.view === 'output') {
            return ( this.total() )
        }
    }

    render() {
        return (
            this.renderView()
        );
    }
}

export default InitialForm;