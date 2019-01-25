/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View, ScrollView, Button, Image, Modal, TouchableHighlight, Text,
} from 'react-native';
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../styling/styles';
import SellerOutput from './SellerOutput';
import SellerCalcs from '../helperFunctions/SellerCalcs';
import ClosingCosts from './SellerClosingCosts';


const Form = t.form.Form;
const options = {
  fields: {
    salesPrice: {
      label: 'Sales Price',
      placeholder: 'Required',
      returnKeyType: 'done',
    },
    brokerFee: {
      label: 'Broker Fee',
      returnKeyType: 'done',
    },
    loanBal: {
      label: 'Loan Balance',
      returnKeyType: 'done',
    },
    interestRate: {
      returnKeyType: 'done',
    },
    propTaxes: {
      returnKeyType: 'done',
    },
  },
};

const User = t.struct({
  salesPrice: t.Number,
  brokerFee: t.String,
  propTaxes: t.String,
  loanBal: t.maybe(t.Number),
  interestRate: t.String,
});


const value = {
  brokerFee: '6.0%',
  propTaxes: '1.25%',
  interestRate: '5.5%',
};

class Sellers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'form',
      pickerDisplay: false,
      county: 'Stanislaus',
      loan: 'Conventional',
      salesPrice: '',
      balance: '',
      netAtClose: '',
      ownersTitlePolicy: '',
      escrowFee: '',
      countyTransferTax: '',
      buyersBrokersFee: '',
      listingBrokersFee: '',
      closingCosts: '',
      loanBal: '',
      countyDisplay: false,
    };
  }

  changeView = (e) => { this.setState({ view: e }); }

  togglePicker = (e) => { this.setState({ pickerDisplay: e }); }

  toggleCounty = (e) => { this.setState({ countyDisplay: e }); }

  changeLoan = (e) => { this.setState({ loan: e }); }

  changeSalesPrice = (e) => { this.setState({ salesPrice: e }); }

  changeBalance = (e) => { this.setState({ balance: e }); }

  changeNetAtClose = (e) => { this.setState({ netAtClose: e }); }

  changeOwnersTitlePolicy = (e) => { this.setState({ ownersTitlePolicy: e }); }

  changeEscrowFee = (e) => { this.setState({ escrowFee: e }); }

  changeCountyTransferTax = (e) => { this.setState({ countyTransferTax: e }); }

  changeBuyersBrokersFee = (e) => { this.setState({ buyersBrokersFee: e }); }

  changeListingBrokersFee = (e) => { this.setState({ listingBrokersFee: e }); }

  changeClosingCosts = (e) => { this.setState({ closingCosts: e }); }

  changeLoanBal = (e) => { this.setState({ loanBal: e }); }

  changeCounty = (e) => { this.setState({ county: e }); }


  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    this.changeLoanBal(value.loanBal);
    SellerCalcs.funcs.calculateAll(value.salesPrice, value.brokerFee, value.propTaxes, value.interestRate, this.bringItBack);
  }

  bringItBack = (broker, salesPrice, balance, escrowFee, ownersTitlePolicy, countyTransferTax, netAtClose, closingCosts) => {
    this.changeView('output');
    this.changeSalesPrice(salesPrice);
    this.changeBalance(balance);
    this.changeNetAtClose(netAtClose);
    this.changeOwnersTitlePolicy(ownersTitlePolicy);
    this.changeEscrowFee(escrowFee);
    this.changeCountyTransferTax(countyTransferTax);
    this.changeBuyersBrokersFee(broker);
    this.changeListingBrokersFee(broker);
    this.changeClosingCosts(closingCosts);
  }


    renderView = () => {
      const { view, pickerDisplay, loan, countyDisplay, county } = this.state;
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
                  {county}

                </Text>
              </View>

              <Modal visible={countyDisplay} animationType="slide" transparent={true} onBackdropPress={() => this.toggleCounty(false) } onRequestClose={() => console.log('Close was requested')}>
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
                  {loan}

                </Text>
              </View>

              <Modal visible={pickerDisplay} animationType="slide" transparent onRequestClose={() => console.log('Close was requested')}>
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
                  {county}

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


              <Modal visible={pickerDisplay} animationType="slide" transparent onRequestClose={() => console.log('Close was requested')}>
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
                  {county}

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


              <Modal visible={pickerDisplay} animationType="slide" transparent onRequestClose={() => console.log('Close was requested')}>
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
                  {county}

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


              <Modal visible={pickerDisplay} animationType="slide" transparent onRequestClose={() => console.log('Close was requested')}>
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
        );
      }
      if (view === 'output') {
        const {
          view, loan, salesPrice, balance, netAtClose, ownersTitlePolicy, escrowFee, countyTransferTax, buyersBrokersFee, listingBrokersFee, closingCosts, loanBal,
        } = this.state;
        return (
          <SellerOutput
            changeView={this.changeView}
            view={view}
            loan={loan}
            salesPrice={salesPrice}
            balance={balance}
            netAtClose={netAtClose}
            ownersTitlePolicy={ownersTitlePolicy}
            escrowFee={escrowFee}
            countyTransferTax={countyTransferTax}
            buyersBrokersFee={buyersBrokersFee}
            listingBrokersFee={listingBrokersFee}
            closingCosts={closingCosts}
            loanBal={loanBal}
          />
        );
      }
      if (view === 'closingCosts') {
        const {
          ownersTitlePolicy, escrowFee, countyTransferTax, buyersBrokersFee, listingBrokersFee, closingCosts, loanBal,
        } = this.state;
        return (
          <ClosingCosts
            changeView={this.changeView}
            ownersTitlePolicy={ownersTitlePolicy}
            escrowFee={escrowFee}
            countyTransferTax={countyTransferTax}
            buyersBrokerFee={buyersBrokersFee}
            listingBrokersFee={listingBrokersFee}
            closingCosts={closingCosts}
            loanBal={loanBal}
          />
        );
      }
      return 'oops';
    }

    render() {
      return (
        this.renderView()
      );
    }
}

export default Sellers;
