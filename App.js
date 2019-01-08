/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { View } from 'react-native';
import InitialForm from './components/InitialForm';
import Output from './components/Output';
import Styles from './styling/styles';
import Navbar from './navigation/NavbarRouting';

class App extends Component {
  render() {
    return (
      <Navbar />
    );
  }
}


export default App;
