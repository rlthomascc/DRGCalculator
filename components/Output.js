import React, { Component } from 'react';
import Styles from '../styling/styles';
import { View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    } from 'react-native';
import t from 'tcomb-form-native';

class Output extends Component {
    constructor(props) {
        super(props);
    }


    output() {
        const {viewChange, down} = this.props;
        console.log(down, 'DOWN')
        return (
            <View>
                <Text style={Styles.styles.titleText}>
                    Down Payment:
                    ${down}
                </Text>
                <View style={Styles.styles.button}>
                <Button
                title="Reset Form"
                onPress={() => viewChange('form')}
                color="white"
                />
                </View>
            </View>
            )
    }

    render() {
        return (
            this.output()
        );
    }
}

export default Output;