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
import PMICalc from '../helperFunctions/PMICalc';
import Values from '../helperFunctions/formValues';
import VAOutput from './VAOutput';
import CashOutput from './CashOutput';


const Form = t.form.Form;


class Buyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerDisplay: false,
      countyDisplay: false,
      county: 'Stanislaus',
      loan: 'Conventional',
      view: 'form',
      home: '',
      escrowFee: '',
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

  toggleCounty = (e) => { this.setState({ countyDisplay: e }); }

  changeCounty = (e) => { this.setState({ county: e }); }

  changePMI = (e) => { this.setState({ pmi: e }); }

  changeHome = (e) => { this.setState({ home: e }); }

  changeEscrowFee = (e) => { this.setState({ escrowFee: e }); }

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

  cashBack = (tax, mip, insurance, pAndI, prepaids, fixed, bringToClose, lendersTitlePolicy, escrowFee, origFee, proratedTax, prepaidInsurance, prepaidTaxes, prepaidInterest) => {
    this.changeTaxes(tax);
    this.changeInsurance(insurance);
    this.changeFixed(fixed);
    this.bringToClose(bringToClose);
    this.changeMIP(mip);
    this.changeClosingCosts(0, escrowFee, 150, 325, 95, 192, 0);
    this.changeEscrowFee(escrowFee);
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

  pmiBack = (pmi) => {
    this.changePMI(pmi);
  }


  handleCashSubmit = () => {
    const value = this._form.getValue();
    FHACalcs.funcs.calculateAll(value.homePrice, '0%', value.taxes, value.hazardInsurance, '0%', '0%', this.cashBack);
    this.changeHome(value.homePrice);
    this.changeView('output');
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
    PMICalc.funcs.calculateAll(value.homePrice, value.downPayment, this.pmiBack);
  }


    renderView = () => {
      const {
        view, loan, pickerDisplay, countyDisplay,
      } = this.state;
      const countyValues = [{
        title: 'San Joaquin',
        value: 'San Joaquin',

      },
      {
        title: 'Stanislaus',
        value: 'Stanislaus',
      }];
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
                  onPress={() => this.toggleCounty(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.county}

                </Text>
              </View>


              <Modal visible={countyDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
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
Specify County:
                    {' '}

                  </Text>
                  {countyValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeCounty(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.toggleCounty(false)} style={{ color: '#999', fontSize: 18 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>


              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.loan}

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
                value={this.state.county === 'Stanislaus' ? Values.funcs.Conventionalvalue : Values.funcs.SanJoaquinConventionalvalue}
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
                  onPress={() => this.toggleCounty(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.county}

                </Text>
              </View>


              <Modal visible={countyDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
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
Specify County:
                    {' '}

                  </Text>
                  {countyValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeCounty(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.toggleCounty(false)} style={{ color: '#999', fontSize: 18 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>


              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.loan}

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
                value={this.state.county === 'Stanislaus' ? Values.funcs.FHAvalue : Values.funcs.SanJoaquinFHAvalue}
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
                  onPress={() => this.toggleCounty(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.county}

                </Text>
              </View>


              <Modal visible={countyDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
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
Specify County:
                    {' '}

                  </Text>
                  {countyValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeCounty(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.toggleCounty(false)} style={{ color: '#999', fontSize: 18 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>


              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.loan}

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
                type={Values.funcs.VA}
                options={Values.funcs.VAoptions}
                value={this.state.county === 'Stanislaus' ? Values.funcs.VAvalue : Values.funcs.SanJoaquinVAvalue}
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
                  onPress={() => this.toggleCounty(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.county}

                </Text>
              </View>


              <Modal visible={countyDisplay} animationType="slide" transparent={true} onRequestClose={() => console.log('Close was requested')}>
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
Specify County:
                    {' '}

                  </Text>
                  {countyValues.map((value, index) => (
                    <TouchableHighlight
                      key={index}
                      onPress={() => this.changeCounty(value.value)}
                      style={{
                        paddingTop: 5, paddingBottom: 5, alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{value.title}</Text>
                    </TouchableHighlight>
                  ))}
                  <TouchableHighlight style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
                    <Text onPress={() => this.toggleCounty(false)} style={{ color: '#999', fontSize: 18 }}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>


              <View style={{ paddingBottom: 30 }}>
                <Text
                  style={{

                    fontWeight: 'bold',
                  }}
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  {this.state.loan}

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
                type={Values.funcs.Cash}
                options={Values.funcs.Cashoptions}
                value={this.state.county === 'Stanislaus' ? Values.funcs.Cashvalue : Values.funcs.SanJoaquinCashvalue}
              />
              <View style={Styles.styles.button}>
                <Button
                  title="Calculate"
                  onPress={this.handleCashSubmit}
                  color="white"
                />
              </View>
            </View>
          </ScrollView>
        );
      }
      if (view === 'output' && loan === 'Conventional') {
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
      if (view === 'output' && loan === 'FHA') {
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
      if (view === 'output' && loan === 'VA') {
        {
          const {
            down, taxes, insurance, pAndL, prepaids, fixed, bringToClose, mip, pmi, loan,
          } = this.state;
          return (
            <VAOutput
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
      }
      if (view === 'output' && loan === 'Cash') {
        {
          const {
            taxes, insurance, fixed, escrowFee, home,
          } = this.state;
          return (
            <CashOutput
              viewChange={this.changeView}
              insurance={insurance}
              taxes={taxes}
              cash={home}
              fixed={fixed}
              escrowFee={escrowFee}
            />
          );
        }
      }
      if (view === 'closingCosts') {
        const {
          closingCosts, loan,
        } = this.state;
        return (
          <ClosingCosts
            viewChange={this.changeView}
            closingCosts={closingCosts}
            loan={loan}
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
