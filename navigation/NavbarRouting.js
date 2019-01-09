/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Linking,
} from 'react-native';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import InitialForm from '../components/InitialForm';
import Output from '../components/Output';

class Link extends React.Component {
  render() {
    const url = 'http://www.thedelrealgroup.com/';
    return (
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
    );
  }
}


export default createMaterialBottomTabNavigator({
  Form: {
    screen: InitialForm,
    navigationOptions: {
      tabBarLabel: 'Form',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-menu" color={tintColor} size={24} />
      ),
    },
  },
  Test: {
    screen: Output,
    navigationOptions: {
      tabBarLabel: 'Output',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle" color={tintColor} size={24} />
      ),
    },
  },
  DelRealGroup: {
    screen: Link,
    navigationOptions: {
      tabBarLabel: 'Del Real Group',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-link" color={tintColor} size={24} />
      ),
    },
  },
},
{
  initialRouteName: 'Form',
  activeTintColor: '#cda135',
  // shifting: true, // MAKES THE COLOR OF BACKGROUND THE ACTIVE TINT COLOR
});


// export default createAppContainer(TabNavigator);
