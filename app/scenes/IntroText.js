import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class IntroText extends Component {
    constructor(props) {
        super(props)
    }

    _transitionToAnimation() {
        Actions.IntroAnimation();
    }

    componentDidMount() {
        setTimeout(this._transitionToAnimation, 100);
    }

    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.text}>
                    This is Curious Ear -
                </Text>
                <Text style={styles.text}>
                    A community engagement project,
                </Text>
                <Text style={styles.text}>
                    creating spaces for people to connect.
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: "black",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontFamily: "curious",
        fontSize: 65,
        textAlign: "center"
    }
});

const mapStateToProps = (state) => {
    return {
        stories: state.get('stories')
    }
};

export default connect(mapStateToProps)(IntroText);
