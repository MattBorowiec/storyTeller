import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class IntroAnimation extends Component {
    constructor(props) {
        super(props)
    }

    _onPressButton() {
        Actions.StoryDsiplay();
    }

    render() {
        let introAnimation =  require('../../img/intro_animation_800x450.gif');
        return (
            <View style={styles.background}>
                <Image
                    source={introAnimation}/>
                <Text style={styles.text}>
                    Here are voices from our communities,
                </Text>
                <Text style={styles.text}>
                    recorded at various Ears around our city.
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
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontFamily: "curious",
        fontSize: 40
    }
});

const mapStateToProps = (state) => {
    return {
        stories: state.get('stories')
    }
};

export default connect(mapStateToProps)(IntroAnimation);
