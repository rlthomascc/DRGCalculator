/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  View, ScrollView, Button, Image,
} from 'react-native';
import t from 'tcomb-form-native';
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
    };
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log(value, 'hello!');
  }


    renderView = () => {
      const { view } = this.state;
      if (view === 'form') {
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
          <SellerOutput />
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
