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
  Image,
} from 'react-native';
import t from 'tcomb-form-native';
import Output from './Output';
import Styles from '../styling/styles';
import Calcs from '../helperFunctions/calculations';


const Form = t.form.Form;
const options = {
  fields: {
    maxFHA: {
      label: 'Max FHA',
    },
    homePrice: {
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
  },
};

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
  closingDate: t.maybe(t.Date),
});

const value = {
  maxFHA: '$350,750',
  downPayment: '3.5%',
  interestRate: '4.625%',
  term: '30',
  hazardInsurance: '0.35%',
  taxes: '1.25%',
};


class Buyers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      down: '',
      view: 'form',
      taxes: '',
      insurance: '',
      pAndL: '',
      prepaids: '',
      fixed: '',
      bringToClose: '',
      mip: '',
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

  dataBack = (tax, mip, insurance, pAndI, prepaids, fixed, bringToClose) => {
    this.changeTaxes(tax);
    this.changeInsurance(insurance);
    this.changePAndI(pAndI);
    this.changePrepaids(prepaids);
    this.changeFixed(fixed);
    this.bringToClose(bringToClose);
    this.changeMIP(mip);
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
    }

    render() {
      return (
        this.renderView()
      );
    }
}


export default Buyers;
