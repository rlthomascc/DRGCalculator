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
      view: 'form'
    }
  }

  changeDown = (e) => {
    this.setState({
      down: e
    })
  }

  changeView = (e) => {
    this.setState({
      view: e
    });
  }

  renderView = () => {
    const { view } = this.state
    if (view === 'form') {
        return (
        <View style={Styles.styles.mainApp}>
          <InitialForm viewChange={this.changeView} downChange={this.changeDown}/>
        </View>
        )
    }
    if (view === 'output') {
        return (
        <View style={Styles.styles.mainApp}>
          <Output viewChange={this.changeView} down={this.state.down}/>
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
