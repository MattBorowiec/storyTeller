import { View, Image, Text, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class StoryComponent extends Component {
    constructor(props) {
        super(props);
        this.path = null;
    }

    onPress() {
        Actions.StoryPlayer({
            url: this.props.url,
            name: this.props.name,
            eventLocation: '  Spaceness',
            eventTime: '  February 32nd, 3017'
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.onPress.bind(this)}
                >
                    <View style={styles.storyContainer}>
                        <View style={styles.blurbContainer}>
                            <Text style={styles.soundBlurb}>
                                Here is where some a published blurb about the story will go. Blurb blurb... Blurb
                            </Text>
                        </View>
                        <View style={styles.playBar}>
                            <View style={styles.buttonContainer}>
                                <Image
                                    style={styles.button}
                                    source={require('../../../img/white-play.png')}/>
                            </View>
                            <View>
                                <Text style={styles.soundLength}>01:34:55</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}
;


const styles = {
    storyContainer: {
        borderWidth: 2,
        borderColor: 'gray',
        height: Dimensions.get('window').height / 2.5, margin: 10,
        width: Dimensions.get('window').width / 4,
    },
    button: {
        resizeMode: "center",
        width: 55,
        height: 55
    },
    buttonContainer: {
        borderRightColor: "white",
        borderRightWidth: 1
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
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "gray"
    },
    soundLength: {
        color: 'white',
        fontSize: 18
    }
};

export default StoryComponent;