/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import {
  View,
  Button,
  ScrollView,
  Text,
  Image,
  Picker,
} from 'react-native';
import t from 'tcomb-form-native';
import Output from './Output';
import ClosingCosts from './ClosingCosts';
import Styles from '../styling/styles';
import Calcs from '../helperFunctions/calculations';
import Values from '../helperFunctions/formValues';


const Form = t.form.Form;

const loanPicker = ['Conventional', 'FHA', 'VA', 'Cash'];

class Buyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loan: 'Conventional',
      view: 'form',
      down: '',
      taxes: '',
      insurance: '',
      pAndL: '',
      prepaids: '',
      fixed: '',
      bringToClose: '',
      mip: '',
      closingCosts: {},
    };
  }

  changeTaxes = (e) => { this.setState({ taxes: e }); };

  changeDown = (e) => { this.setState({ down: e }); };

  changeView = (e) => { this.setState({ view: e }); };

  changeInsurance = (e) => { this.setState({ insurance: e }); };

  changePAndI = (e) => { this.setState({ pAndL: e }); };

  changePrepaids = (e) => { this.setState({ prepaids: e }); };

  changeFixed = (e) => { this.setState({ fixed: e }); };

  bringToClose = (e) => { this.setState({ bringToClose: e }); }

  changeMIP = (e) => { this.setState({ mip: e }); }

  changeClosingCosts = (lendersTitlePolicy, escrowFee, origFee, proratedTax, prepaidInsurance, prepaidTaxes, prepaidInterest) => {
    this.setState({
      closingCosts: {
        lendersTitlePolicy: { lendersTitlePolicy },
        escrowFee: { escrowFee },
        origFee: { origFee },
        proratedTax: { proratedTax },
        prepaidInsurance: { prepaidInsurance },
        prepaidTaxes: { prepaidTaxes },
        prepaidInterest: { prepaidInterest },
      },
    });
  }


  dataBack = (tax, mip, insurance, pAndI, prepaids, fixed, bringToClose, lendersTitlePolicy, escrowFee, origFee, proratedTax, prepaidInsurance, prepaidTaxes, prepaidInterest) => {
    this.changeTaxes(tax);
    this.changeInsurance(insurance);
    this.changePAndI(pAndI);
    this.changePrepaids(prepaids);
    this.changeFixed(fixed);
    this.bringToClose(bringToClose);
    this.changeMIP(mip);
    this.changeClosingCosts(lendersTitlePolicy, escrowFee, origFee, proratedTax, prepaidInsurance, prepaidTaxes, prepaidInterest.toLocaleString(2));
  }

  downBack = (view, down) => {
    this.changeView(view);
    this.changeDown(down);
  }

    handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      Calcs.funcs.calculateDownPayment(value.homePrice,
        value.downPayment, this.downBack);
      Calcs.funcs.calculateAll(value.homePrice,
        value.downPayment,
        value.taxes,
        value.hazardInsurance,
        value.interestRate,
        value.term, this.dataBack);
    }


    renderView = () => {
      const { view, loan } = this.state;
      if (view === 'form' && loan === 'Conventional') {
        return (
          <ScrollView>
            <View style={Styles.styles.container}>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
              }}
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
                />
              </View>

              <Picker
                selectedValue={loan}
                onValueChange={itemValue => this.setState({ loan: itemValue })}
              >
                <Picker.Item label="Conventional" value="Conventional" />
                <Picker.Item label="FHA" value="FHA" />
                <Picker.Item label="VA" value="VA" />
                <Picker.Item label="Cash" value="Cash" />
              </Picker>

              <Form
                ref={c => this._form = c}
                type={Values.funcs.Conventional}
                options={Values.funcs.Conventionaloptions}
                value={Values.funcs.Conventionalvalue}
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
        );
      }
      if (view === 'form' && loan === 'FHA') {
        return (
          <ScrollView>
            <View style={Styles.styles.container}>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
              }}
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
                />
              </View>

              <Picker
                selectedValue={loan}
                onValueChange={itemValue => this.setState({ loan: itemValue })}
              >
                <Picker.Item label="Conventional" value="Conventional" />
                <Picker.Item label="FHA" value="FHA" />
                <Picker.Item label="VA" value="VA" />
                <Picker.Item label="Cash" value="Cash" />
              </Picker>

              <Form
                ref={c => this._form = c}
                type={Values.funcs.FHA}
                options={Values.funcs.FHAoptions}
                value={Values.funcs.FHAvalue}
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
        );
      }
      if (view === 'form' && loan === 'VA') {
        return (
          <ScrollView>
            <View style={Styles.styles.container}>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
              }}
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
                />
              </View>

              <Picker
                selectedValue={loan}
                onValueChange={itemValue => this.setState({ loan: itemValue })}
              >
                <Picker.Item label="Conventional" value="Conventional" />
                <Picker.Item label="FHA" value="FHA" />
                <Picker.Item label="VA" value="VA" />
                <Picker.Item label="Cash" value="Cash" />
              </Picker>

              <Form
                ref={c => this._form = c}
                type={Values.funcs.VA}
                options={Values.funcs.VAoptions}
                value={Values.funcs.VAvalue}
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
        );
      }
      if (view === 'form' && loan === 'Cash') {
        return (
          <ScrollView>
            <View style={Styles.styles.container}>

              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10,
              }}
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
                />
              </View>

              <Picker
                selectedValue={loan}
                onValueChange={itemValue => this.setState({ loan: itemValue })}
              >
                <Picker.Item label="Conventional" value="Conventional" />
                <Picker.Item label="FHA" value="FHA" />
                <Picker.Item label="VA" value="VA" />
                <Picker.Item label="Cash" value="Cash" />
              </Picker>

              <Form
                ref={c => this._form = c}
                type={Values.funcs.Cash}
                options={Values.funcs.Cashoptions}
                value={Values.funcs.Cashvalue}
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
        );
      }
      if (view === 'output') {
        const {
          down, taxes, insurance, pAndL, prepaids, fixed, bringToClose, mip,
        } = this.state;
        return (
          <Output
            viewChange={this.changeView}
            down={down}
            taxes={taxes}
            insurance={insurance}
            pAndL={pAndL}
            prepaids={prepaids}
            fixed={fixed}
            bringToClose={bringToClose}
            mip={mip}
          />
        );
      }
      if (view === 'closingCosts') {
        const {
          closingCosts,
        } = this.state;
        return (
          <ClosingCosts
            viewChange={this.changeView}
            closingCosts={closingCosts}
          />
        );
      }
    }

    render() {
      return (
        this.renderView()
      );
    }
}


export default Buyers;
