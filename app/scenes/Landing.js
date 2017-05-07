import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class Landing extends Component {
    constructor(props) {
        super(props)
    }

    _onPressButton() {
        Actions.IntroText();
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._onPressButton.bind(this)}>
                    <Image source={require('../../img/App_LoadingMouth.gif')} style={styles.background}/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});

export default Landing;
