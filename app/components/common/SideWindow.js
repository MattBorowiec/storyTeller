import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import Dimensions from 'Dimensions';

class sideWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideValue: new Animated.Value(0),
        }
    }

    windowSlide() {
        if (!this.state.showing) {
            Animated.timing(
                this.state.slideValue,
                {
                    duration: 700,
                    easing: Easing.elastic(0),
                    toValue: 1
                }
            ).start();
            this.setState({showing: true})
        }
        if (this.state.showing) {
            Animated.timing(
                this.state.slideValue,
                {
                    duration: 700,
                    easing: Easing.elastic(0),
                    toValue: 0
                }
            ).start();
            this.setState({showing: false})
        }
    }

    render() {
        const left = this.state.slideValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-Dimensions.get('window').width / 3 + 5, 0]
        });

        const outArrow = require('../../../img/button-box-arrow-right.png');
        const inArrow = require('../../../img/button-box-arrow-left.png');
        let arrowURI = !this.state.showing ? outArrow : inArrow;

        return (
            <Animated.View style={[{left}, styles.infoWindow]}>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTextHeader}>This is Curious Ear...</Text>
                    <Text></Text>
                    <Text style={styles.infoTextBody}>
                        Curious Ear is a project formed to bring people
                        together. To inspire connection between groups of
                        people, who might not otherwise meet. In a time so heavily
                        marked by division, we seek to find the common
                        grounds we share.
                        {'\n\n'}
                        Curious Ear is artists, coders, writers, dreamers.
                        Curious Ear is you.
                        To find out how to become a bigger part of it, or tell your story, find us at
                        CuriousEar.com
                    </Text>
                </View>
                <Image source={require("../../../img/chalk-border-horizontal.png")} style={{tintColor: '#4e8fb5', backgroundColor: 'black'}} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={this.windowSlide.bind(this)}
                    >
                        <Image source={arrowURI} style={{ tintColor: '#4e8fb5', alignSelf: 'center', backgroundColor: 'black'}}/>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}
const styles = {
    infoWindow: {
        position: 'absolute',
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 0,
        bottom: 0
    },
    infoTextContainer: {
        flex: 1,
        width: Dimensions.get('window').width / 3,
        backgroundColor: 'black',
        paddingTop: 50,
        paddingBottom: 40,
        paddingLeft: 20,
        zIndex: 2
    },
    infoTextHeader: {
        fontSize: 35,
        color: "white",
        fontFamily: "curious"
    },
    buttonContainer: {
        alignSelf: 'center',
        padding: 1,
        backgroundColor: 'transparent',
        marginLeft: -19
    },
    infoTextBody: {
        color: "white",
        fontSize: 30,
        fontFamily: "curious"
    },
    learnMoreContainer: {
        borderColor: "white",
        borderWidth: 2
    },
    learnMoreText: {
        color: "white",
        textAlign: "center",
        fontSize: 35,
        fontFamily: "curious"

    }
}

export default sideWindow;