import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InitialForm from './components/InitialForm';
import Output from './components/Output';
import Styles from './styling/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      down: '',
      view: 'form',
      taxes: '',
      insurance: '',
      pAndL: '',
    }
  }

  changeTaxes = (e) => { this.setState({ taxes: e })}
  changeDown = (e) => { this.setState({ down: e })}
  changeView = (e) => { this.setState({ view: e })}
  changeInsurance = (e) => { this.setState({ insurance: e })}
  changePAndL = (e) => { this.setState({ pAndL: e })}

  renderView = () => {
    const { view } = this.state
    if (view === 'form') {
        return (
        <View style={Styles.styles.mainApp}>
          <InitialForm viewChange={this.changeView}
          downChange={this.changeDown}
          changeTaxes={this.changeTaxes}
          changeInsurance={this.changeInsurance}
          changePAndL={this.changePAndL}
          />
        </View>
        )
    }
    if (view === 'output') {
      const {down, taxes, insurance, pAndL} = this.state
        return (
        <View style={Styles.styles.mainApp}>
          <Output viewChange={this.changeView}
          down={down}
          taxes={taxes}
          insurance={insurance}
          pAndL={pAndL}
          />
        </View>
        )
    }
}

  render() {
    return (
      this.renderView()
    );
  }
}


export default App
