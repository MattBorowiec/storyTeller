import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import TextChange from '../components/text/textChange'

class IntroAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialText: true
        }
    }

    _onPressButton() {
        Actions.StoryDisplay();
    }

    componentDidMount() {
        setTimeout(this._swapText.bind(this), 10000);
    }

    _swapText() {
        this.setState({initialText: false})
    }

    render() {
        let introAnimation = require('../../img/intro_animation_800x450.gif');
        return (
            <View style={styles.background}>
                <TouchableOpacity style={styles.background} onPress={this._onPressButton.bind(this)}>
                <Image
                    style={styles.gif}
                    source={introAnimation}/>
                <TextChange initialText={this.state.initialText}/>
                    <View style={styles.continueContainer}>
                        <Text style={styles.continueText}>
                            Tap Screen to Continue
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    continueContainer: {
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 10,
        height: 50,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    continueText: {
        fontSize: 40,
        fontFamily: "curious"
    },
    gif: {
        marginBottom: 30
    }

});

export default IntroAnimation;
