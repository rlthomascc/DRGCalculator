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


const Form = t.form.Form;
const options = {
  fields: {
    salesPrice: {
      label: 'Sales Price',
      placeholder: 'Required',
    },
    brokerFee: {
      label: 'Broker Fee',
    },
    misc: {
      label: 'Misc',
    },
    loanBal: {
      label: 'Loan Bal',
    },
    closingDate: {
      label: 'Closing Date',
    },
  },
};

const User = t.struct({
  salesPrice: t.Number,
  brokerFee: t.String,
  repairs: t.maybe(t.Number),
  misc: t.maybe(t.Number),
  propTaxes: t.String,
  loanBal: t.maybe(t.Number),
  interestRate: t.String,
  closingDate: t.maybe(t.Date),
//   misc: t.maybe(t.Number),
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
      loan: 'Conventional',
    };
  }

  changeView = (e) => { this.setState({ view: e }); }

  togglePicker = (e) => { this.setState({ pickerDisplay: e }); }

  changeLoan = (e) => { this.setState({ loan: e }); }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    this.calculateMethods(value);
    this.changeView('output');
    console.log(value, 'hello!');
  }

  calculateMethods = (value) => {
    console.log(value);
  }


    renderView = () => {
      const { view, pickerDisplay, loan } = this.state;
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
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  Conventional

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
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  Conventional

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
                  onPress={() => this.togglePicker(true)}
                >
                  <Icon name="ios-arrow-down" size={20} />
                  {'   '}
                  Conventional

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
        return (
          <SellerOutput
            changeView={this.changeView}
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
