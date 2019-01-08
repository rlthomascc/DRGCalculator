import React from 'react';
import {
  Linking,
} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import InitialForm from '../components/InitialForm';


class Link extends React.Component {
  render() {
    const url = 'http://www.thedelrealgroup.com/';
    return (
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
    );
  }
}


const TabNavigator = createBottomTabNavigator({
  Form: InitialForm,
  DelRealGroup: Link,
});


export default createAppContainer(TabNavigator);
