/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Text, View, Linking, Image, TouchableHighlight, ScrollView,
} from 'react-native';
import Style from '../styling/styles';


class AboutUs extends Component {
    goToMain = () => {
      const url = 'http://www.thedelrealgroup.com';
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }

    goToListings = () => {
      const url = 'https://www.thedelrealgroup.com/results-gallery/?userID=all';
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }

    goToContact = () => {
      const url = 'https://www.thedelrealgroup.com/contactus/';
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }

    goToReviews = () => {
      const url = 'http://www.delrealgroupreviews.com/';
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }

    goToText = () => {
      const url = 'sms:1-209-670-7744'; // CHANGE THIS NUMBER!!!!!
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }

    goToCall = () => {
      const url = 'tel:1-209-670-7744'; // CHANGE THIS NUMBER!!!!!
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
    }


    render() {
      return (
        <ScrollView>

          <View style={Style.styles.aboutUs}>

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 20,
            }}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: 'http://static1.squarespace.com/static/558afaebe4b04871ce600780/t/558afbc9e4b01d698d1a354f/1435171786494/smaller.png?format=1500w' }}
              />
            </View>


            <Text
              style={{
                color: '#CDA135', fontSize: 15, textAlign: 'center', fontWeight: 'bold',
              }}
              onPress={this.goToMain}
            >
            The Del Real Group
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            />


            <Text
              style={{
                color: 'grey', fontSize: 15, paddingTop: 20, textAlign: 'center', fontWeight: 'bold',
              }}
              onPress={this.goToListings}
            >
          Current Listings
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            />

            <Text
              style={{
                color: 'grey', fontSize: 15, paddingTop: 20, textAlign: 'center', fontWeight: 'bold',
              }}
              onPress={this.goToContact}
            >
            Contact Us
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            />

            <Text
              style={{
                color: 'grey', fontSize: 15, paddingTop: 20, textAlign: 'center', fontWeight: 'bold',
              }}
              onPress={this.goToReviews}
            >
              Leave Us A Review
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableHighlight onPress={() => this.goToCall()}>
                <Image
                  style={{ width: 150, height: 150, justifyContent: 'center' }}
                  source={{ uri: 'https://i.imgur.com/VVSkwpV.png' }}
                />
              </TouchableHighlight>


              <TouchableHighlight onPress={() => this.goToText()}>
                <Image
                  style={{
                    width: 150, height: 150, justifyContent: 'center',
                  }}
                  source={{ uri: 'https://i.imgur.com/9m5FygB.png' }}
                />
              </TouchableHighlight>
            </View>

            <View style={{ paddingTop: 20, justifyContent: 'center' }}>
              <Text style={{ fontStyle: 'italic', fontSize: 10, textAlign: 'center' }}>
                    All information on this site is an estimation and is not 100% accurate.
                    For Accurate data please consult your Real Estate Agent and/or Lender.
                {'\n'}
                {'\n'}
                    DRE Agent Lic. No. 01423976 | The Del Real Group 2019 | Built V. 1.2
              </Text>
            </View>


          </View>

        </ScrollView>

      );
    }
}

export default AboutUs;
