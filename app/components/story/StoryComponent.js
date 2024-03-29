import { View, Image, Text, TouchableOpacity, Animated} from 'react-native';
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';



class StoryComponent extends Component {
    constructor(props) {
        super(props);
        this.path = null;
    }



    onPress() {
        clearTimeout(this.props.timeoutId);
        Actions.StoryPlayer({
            url: this.props.url,
            name: this.props.name,
            event_time: this.props.event_time,
            event_location: this.props.event_location
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.onPress.bind(this)}
                >
                    {this.props.isFeatured ?
                        <Animated.View style={[styles.storyContainer,{borderColor: this.props.featuredColors}]}>
                            <View style={[styles.playBar, {borderColor: this.props.color}]}>
                                <Animated.View style={[styles.buttonContainer, {borderColor: this.props.featuredColors}]}>
                                    <Animated.Image
                                        style={[{tintColor: this.props.featuredColors}, styles.button]}
                                        source={require('../../../img/play-arrow-chalk-red.png')}/>
                                </Animated.View>
                                <View style={styles.durationContainer}>
                                    <Animated.Text style={[styles.soundLength, {color: this.props.featuredColors, borderColor: this.props.featuredColors}]}>{this.props.duration}</Animated.Text>
                                </View>
                            </View>
                        </Animated.View>
                    :
                        <View style={[styles.storyContainer,{borderColor: this.props.color}]}>
                            <View style={[styles.playBar, {borderColor: this.props.color}]}>
                                <View style={[styles.buttonContainer, {borderColor: this.props.color}]}>
                                    <Image
                                        style={[styles.button, {tintColor: this.props.color}]}
                                        source={require('../../../img/play-arrow-chalk-red.png')}/>
                                </View>
                                <View style={styles.durationContainer}>
                                    <Text style={[styles.soundLength, {color: this.props.color, borderColor: this.props.color}]}>{this.props.duration}</Text>
                                </View>
                            </View>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        );
    };
};


const styles = {
    container: {
      height: 100
    },
    storyContainer: {
        borderWidth: 4,
        margin: 10,
        width: Dimensions.get('window').width / 4,
        borderRadius: 18
    },
    button: {
        //resizeMode: "center"
        //width: 55,
        //height: 55
    },
    buttonContainer: {
        borderRightWidth: 3
    },
    blurbContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    soundBlurb: {
        color: 'dimgray',
        fontSize: 18,
        backgroundColor: "white",
        textAlign: "center"
    },
    playBar: {
        flex: 3,
        flexDirection: 'row',
        // borderWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "transparent"
    },
    soundLength: {
        fontSize: 50,
        textAlign: "center",
        fontFamily: "curious"
    },
    durationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const mapStateToProps = (state) => {
    return {
        timeoutId: state.getIn(['sequences', 'timeoutId'])
    }
}

export default connect(mapStateToProps)(StoryComponent);