/* eslint-disable react/jsx-boolean-value */
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
  Modal,
  TouchableHighlight,
} from 'react-native';
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Output from './Output';
import ClosingCosts from './ClosingCosts';
import Styles from '../styling/styles';
import FHACalcs from '../helperFunctions/FHAcalculations';
import ConventionalCalcs from '../helperFunctions/Conventionalcalculations';
import Values from '../helperFunctions/formValues';


const Form = t.form.Form;


class Buyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerDisplay: false,
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
      pmi: '',
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

  changeLoan = (e) => { this.setState({ loan: e }); }

  togglePicker = (e) => { this.setState({ pickerDisplay: e }); }

  changePMI = (e) => { this.setState({ pmi: e }); }

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


  dataBack = (tax, mip, insurance, pAndI, prepaids, fixed, bringToClose, lendersTitlePolicy, escrowFee, origFee, proratedTax, prepaidInsurance, prepaidTaxes, prepaidInterest, pmi) => {
    this.changeTaxes(tax);
    this.changeInsurance(insurance);
    this.changePAndI(pAndI);
    this.changePrepaids(prepaids);
    this.changeFixed(fixed);
    this.bringToClose(bringToClose);
    this.changeMIP(mip);
    this.changePMI(pmi);
    this.changeClosingCosts(lendersTitlePolicy, escrowFee, origFee, proratedTax, prepaidInsurance, prepaidTaxes, prepaidInterest.toLocaleString(2));
  }

  downBack = (view, down) => {
    this.changeView(view);
    this.changeDown(down);
  }

    handleSubmit = () => {
      const value = this._form.getValue(); // use that ref to get the form value
      FHACalcs.funcs.calculateDownPayment(value.homePrice,
        value.downPayment, this.downBack);
      FHACalcs.funcs.calculateAll(value.homePrice,
        value.downPayment,
        value.taxes,
        value.hazardInsurance,
        value.interestRate,
        value.term, this.dataBack);
    }


    renderView = () => {
      const { view, loan, pickerDisplay } = this.state;
      const pickerValues = [{
        title: 'Conventional',
        value: 'Conventional',
      },
      {
        title: 'FHA',
        value: 'FHA',
      },
      {
        title: 'VA',
        value: 'VA',
      },
      {
        title: 'Cash',
        value: 'Cash',
      }];
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

              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  Conventional

                </Text>
              </View>


              <Modal visible={pickerDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={{
                  margin: 20,
                  padding: 20,
                  backgroundColor: '#efefef',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontWeight: 'bold', alignItems: 'center', marginBottom: 15,
                  }}
                  >
Please pick a Loan Type:
                    {' '}

                  </Text>
                  {pickerValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeLoan(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.togglePicker(false)} style={{ color: '#999', fontSize: 18 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>

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

              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  FHA

                </Text>
              </View>


              <Modal visible={pickerDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={{
                  margin: 20,
                  padding: 20,
                  backgroundColor: '#efefef',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontWeight: 'bold', alignItems: 'center', marginBottom: 15,
                  }}
                  >
Please pick a Loan Type:
                    {' '}

                  </Text>
                  {pickerValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeLoan(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.togglePicker(false)} style={{ color: '#999', fontSize: 18 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>

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

              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  VA

                </Text>
              </View>


              <Modal visible={pickerDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={{
                  margin: 20,
                  padding: 20,
                  backgroundColor: '#efefef',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontWeight: 'bold', alignItems: 'center', marginBottom: 15,
                  }}
                  >
Please pick a Loan Type:
                    {' '}

                  </Text>
                  {pickerValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeLoan(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.togglePicker(false)} style={{ color: '#999', fontSize: 16 }}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </Modal>

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

              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  Cash

                </Text>
              </View>


              <Modal visible={pickerDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
                <View style={{
                  margin: 20,
                  padding: 20,
                  backgroundColor: '#efefef',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <Text style={{
                    fontWeight: 'bold', alignItems: 'center', marginBottom: 15,
                  }}
                  >
Please pick a Loan Type:
                    {' '}

                  </Text>
                  {pickerValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeLoan(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.togglePicker(false)} style={{ color: '#999', fontSize: 16 }}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </Modal>

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
          down, taxes, insurance, pAndL, prepaids, fixed, bringToClose, mip, pmi, loan,
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
            pmi={pmi}
            loan={loan}
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
