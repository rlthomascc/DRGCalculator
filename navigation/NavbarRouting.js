/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Linking, View, Text,
} from 'react-native';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Buyers from '../components/Buyers';
import Sellers from '../components/Sellers';
import AboutUs from '../components/AboutUs';


// class Link extends React.Component {
//   render() {
//     return (
//       <View><Text>Hello World</Text></View>
//     );
//   }
// }


export default createMaterialBottomTabNavigator({
  Form: {
    screen: Buyers,
    navigationOptions: {
      tabBarLabel: 'Buyers',
      onPress: console.log('test'),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={25} />
      ),
    },
  },
  Test: {
    screen: Sellers,
    navigationOptions: {
      tabBarLabel: 'Sellers',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-pricetags" color={tintColor} size={25} />
      ),
    },
  },
  // Investors: {
  //   screen: Link,
  //   navigationOptions: {
  //     tabBarLabel: 'Investors',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-calculator" color={tintColor} size={25} />
  //     ),
  //   },
  // },
  DelRealGroup: {
    screen: AboutUs,
    navigationOptions: {
      tabBarLabel: 'Del Real Group',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-key" color={tintColor} size={25} />
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
