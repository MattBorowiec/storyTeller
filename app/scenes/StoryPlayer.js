import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView,  ActivityIndicator, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';
import { Actions } from 'react-native-router-flux';
import { formatDuration } from '../core/story_core'
import { Colors, ThemeBorderColors, ThemeTintColors } from '../stylesheets/theme';
import { randomProperty } from '../core/story_core'


class StoryPlayer extends Component {
    constructor(props) {
        super(props);
        this.sound = {
            blob: null,
            path: ""
        };
        this.state = {
            started: false,
            loading: true,
            playing: false,
            seconds_remaining: -1
        };
        this.countDownId = null;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            return this._pressBack()
        });
        RNFetchBlob
            .config({
                path: RNFetchBlob.fs.dirs.CacheDir + "/" + this.props.name,
                session: 'storyTeller'
            })
            .fetch('GET', this.props.url)
            .then((res) => {
                this.sound.path = res.path();
                return RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}])
            })
            .then(() => {
                this.sound.blob = new Sound(this.sound.path, '', (error) => {
                    if (error) {
                        console.log("StoryTeller::RNFetchBlob::CreateBlobErr:: " + error);
                    } else {
                        this.setState({loading: false, seconds_remaining: this.sound.blob.getDuration().toFixed(0)});
                        setTimeout(this.play.bind(this), 1000)
                    }
                });
            })
            .catch((errorMessage) => {
                // console.log("StoryTeller::RNFetchBlob::Error:: " + errorMessage);
            });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
        clearTimeout(this.countDownId);
    }


    _pressBack() {
        this.sound.blob.pause();
        this.sound.blob.release();
        RNFetchBlob.session('storyTeller').dispose();
        this.setNewTimeout();
    }

    countDown(action) {
        if (action === 'start') {
            this.countDownId = setInterval(() => {
                if (this.state.seconds_remaining > 0) {
                    this.setState({seconds_remaining: this.state.seconds_remaining - 1})
                }
            }, 1000);
        } else {
            clearTimeout(this.countDownId)
        }
    }

    play() {
        this.setState({started: true});
        if (!this.state.playing) {
            this.countDown('start');
            this.sound.blob.play(() => {
                this.setState({playing: false});
                this.sound.blob.release();
                RNFetchBlob.session('storyTeller').dispose();
                this.setNewTimeout();
                Actions.pop();
            });
            this.setState({playing: true})
        } else {
            this.sound.blob.pause();
            this.setState({playing: false});
            this.countDown('stop');
        }
    };

    setNewTimeout() {
        var id = setTimeout(()=> {
           Actions.popTo('Landing')
        }, 300000);
        store.dispatch({type: 'SET_TIMEOUT_ID', timeoutId: id});
    }


    close() {
        this.sound.blob.pause();
        this.sound.blob.release();
        RNFetchBlob.session('storyTeller').dispose();
        this.setNewTimeout();
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
                    {this.state.started ?
                        <Text style={styles.whenLabel}>TIME REMAINING:{'\  '}
                        <Text style={styles.location}>{formatDuration(this.state.seconds_remaining)}</Text>
                    </Text> :
                    null
                    }
                    {this.state.started ?
                        /* Only show X if audio is loaded, otherwise if user hits X before screen pops but the audio still plays */
                        <TouchableOpacity style={styles.closeContainer} onPress={this.close.bind(this)}>
                            <Text style={styles.closePlayer}>X</Text>
                        </TouchableOpacity> :
                        null
                    }
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
        width: Dimensions.get("window").width + 100
    }

};


const mapStateToProps = (state) => {
    return {
        stories: state.getIn(['stories', 'stories'])
    }
};

export default connect(mapStateToProps)(StoryPlayer);