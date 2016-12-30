import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView,  ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';


class StoryPlayer extends Component {
    constructor(props) {
        super(props);
        this.sound = null;
        this.state = {
            loading: true,
            playing: false
        }
    }

    componentDidMount() {
        RNFetchBlob
            .config({
                path: RNFetchBlob.fs.dirs.CacheDir + this.props.name
            })
            .fetch('GET', this.props.url)
            .then((res) => {
                this.path = res.path();
                return RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}])
            })
            .then(() => {
                this.sound = new Sound(this.path, '', (error) => {
                    if (error) {
                        console.log('failed to load the sound from path ', this.props.url, error);
                    } else {
                        console.log('success, audio length is ' + 'url is ' + this.props.url, this.sound.getDuration());
                        this.setState({loading: false, length: this.sound.getDuration()});
                    }
                })
            })
            .catch((errorMessage) => {
                console.log(errorMessage);
            });
    }

    play() {
        if (!this.state.playing) {
            this.setState({playing: true})
        } else {
            this.sound.pause();
            this.setState({playing: false});
        }
    };

    render() {
        const play = require('../../../img/gray-play.png');
        const pause = require('../../../img/pause-red.png');
        let playUri = !this.state.playing ? play : pause;

        if (this.state.loading) {
            return <ActivityIndicator
                animating={true}
                style={styles.button}
                color="green"
                size={100}
            />
        }

        return (
            <View style={styles.container}>
                <View style={styles.earLocationLabel}>
                    <Text style={styles.whereLabel}>WHERE:
                        <Text style={styles.location}>$PLACEHOLDER</Text>
                    </Text>
                    <Text style={styles.whenLabel}>WHEN:
                        <Text style={styles.location}>$PLACEHOLDER</Text>
                    </Text>
                    <TouchableOpacity style={styles.closeContainer} onPress={this.play.bind(this)}>
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
                    <Text>TODO Remove this.{this.props.url}</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    button: {
        height: 200,
        width: 200,
        zIndex: 0,
        left: (Dimensions.get('window').width / 2) - 100,

    },
    earLocationLabel: {
        width: Dimensions.get("window").width,
        height: 100
    },
    buttonContainer: {
        flex: 1,
        width: Dimensions.get("window").width,
    },
    whereLabel: {
        color: "black",
        left: 20,
        top: 20,
        fontSize: 25,
    },
    location: {
        fontWeight: "bold"
    },
    whenLabel: {
        color: "black",
        left: 30,
        top: 15,
        fontSize: 25
    },
    closePlayer: {
        color: "gray",
        fontWeight: "bold",
        fontSize: 35,


    },
    closeContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
        top: 0,
        right: 0,
    },
    audioTrackingContainer : {
        backgroundColor: "white",
        height: 250

    }

};


const mapStateToProps = (state) => {
    return {
        stories: state.get('stories'),
    }
};

export default connect(mapStateToProps)(StoryPlayer);