import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView,  ActivityIndicator, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';
import { Actions } from 'react-native-router-flux';
import resetTimer from '../components/timer/resetTimer';

class StoryPlayer extends Component {
    constructor(props) {
        super(props);
        this.sound = {
            blob: null,
            path: ""
        };
        this.state = {
            loading: true,
            playing: false
        };
    }

    componentDidMount() {
        RNFetchBlob
            .config({
                path: RNFetchBlob.fs.dirs.CacheDir + this.props.name
            })
            .fetch('GET', this.props.url)
            .then((res) => {
                this.sound.path = res.path();
                return RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}])
            })
            .then(() => {
                this.sound.blob = new Sound(this.sound.path, '', (error) => {
                    if (error) {
                        console.log('failed to load the sound from path ', this.props.url, error);
                    } else {
                        console.log('success, audio length is ' + 'url is ' + this.props.url, this.sound.blob.getDuration());
                        this.setState({loading: false, length: this.sound.blob.getDuration()});
                        setTimeout(this.play.bind(this), 1000)
                    }
                });
            })
            .catch((errorMessage) => {
                console.log(errorMessage);
            });
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return this._pressBack()
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    _pressBack() {
        RNFetchBlob.fs.unlink(this.sound.path);
        this.sound.blob.pause();
    }

    play() {
        if (!this.state.playing) {
            resetTimer.stop();
            this.sound.blob.play(() => {
                this.setState({playing: false})
                resetTimer.start(15000);
                Actions.pop();
            });
            this.setState({playing: true})
        } else {
            this.sound.blob.pause();
            this.setState({playing: false});
            resetTimer.start(15000);
        }
    };

    close() {
        this.sound.blob.pause();
        RNFetchBlob.fs.unlink(this.sound.path);
        Actions.pop();
    }

    render() {
        const play = require('../../img/play-arrow-chalk-purple.png');
        const pause = require('../../img/pause-lines-chalk-purple.png');
        let playUri = !this.state.playing ? play : pause;
        let playImg = this.state.playing ? require('../../img/wave.gif') : require('../../img/sound-wave.png');


        if (this.state.loading) {
            return <View style={styles.container}>
                <ActivityIndicator
                animating={true}
                style={styles.button}
                color="green"
                size={100}
            />
            </View>
        }

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.whereLabel}>WHERE:{'\  '}
                        <Text style={styles.location}>{this.props.event_location}</Text>
                    </Text>
                    <Text style={styles.whenLabel}>WHEN:{'\  '}
                        <Text style={styles.location}>{ this.props.event_time}</Text>
                    </Text>
                    <TouchableOpacity style={styles.closeContainer} onPress={this.close.bind(this)}>
                        <Text style={styles.closePlayer}>X</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.play.bind(this)}>
                        <Image
                            style={styles.button}
                            source={playUri}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.audioTrackingContainer}>
                    <Image
                        style={styles.playingImg}
                        source={playImg}/>
                </View>
            </View>
        );
    }
}


const styles = {
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        backgroundColor: "black"
    },
    button: {
        height: 150,
        width: 150,
        flex: 2,
        left: (Dimensions.get('window').width / 2) - 75,
        backgroundColor: "black"

    },
    headerContainer: {
        width: Dimensions.get("window").width,
        flex: 1
    },
    buttonContainer: {
        flex: 2,
        width: Dimensions.get("window").width,
    },
    whereLabel: {
        color: "white",
        left: 20,
        top: 20,
        fontSize: 40,
        fontFamily: "curious"
    },
    location: {
        fontWeight: "bold"
    },
    whenLabel: {
        color: "white",
        left: 30,
        top: 15,
        fontSize: 40,
        fontFamily: "curious"
    },
    closePlayer: {
        color: "gray",
        fontSize: 50,
        fontFamily: "curious",
        marginBottom: 6
    },
    closeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: 50,
        height: 50,
        borderWidth: 4,
        borderRadius: 25,
        borderColor: "gray",
        top: 20,
        right: 20
    },
    audioTrackingContainer: {
        flex: 3,
        alignItems: "center"
    },
    playingImg: {
        // flex: 1,
        // resizeMode: "stretch",
        width: Dimensions.get("window").width + 100
    }

};


const mapStateToProps = (state) => {
    return {
        stories: state.get('stories'),
    }
};

export default connect(mapStateToProps)(StoryPlayer);