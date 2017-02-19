import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class IntroAnimation extends Component {
    constructor(props) {
        super(props)
    }

    _onPressButton() {
        Actions.StoryDisplay();
    }

    render() {
        let introAnimation = require('../../img/intro_animation_800x450.gif');
        return (
            <View style={styles.background}>
                <Image
                    style={styles.gif}
                    source={introAnimation}/>
                <Text style={styles.text}>
                    Here are voices from our communities,
                </Text>
                <Text style={styles.text}>
                    recorded at various Ears around our city.
                </Text>
                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                    <View style={styles.continueContainer}>
                        <Text style={styles.continueText}>
                            Tap to Continue
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
    text: {
        color: "white",
        fontFamily: "curious",
        fontSize: 40
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
        marginTop: 50
    },
    continueText: {
        fontSize: 40,
        fontFamily: "curious"
    },
    gif: {
        marginBottom: 30
    }

});

const mapStateToProps = (state) => {
    return {
        stories: state.get('stories')
    }
};

export default connect(mapStateToProps)(IntroAnimation);
