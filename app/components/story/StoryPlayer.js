import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import {Story} from './Story'
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import { Player } from 'react-native-audio-streaming';



export default class StoryPlayer extends Component {
  constructor (props) {
    super(props)
    this.state ={
      storyCreated: false,
      playing: false
    }
  }

  componentWillMount() {
    global.story = new Story('test.mp3', 'https://storage.googleapis.com/storybox-pdx/cde9b773-fb43-4d6c-9b8b-5813117c436a.mp3');
    story.fetch().then(() => {
      story.create()
    });
  }


  _onPressButton() {
      if(!this.state.playing) {
        this.setState({playing: true})
        setTimeout(() => {
        story.soundControl.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        console.log(this.state, 'should be playing!')
        }, 5000)
      } else {
        this.setState({playing: false});
        story.soundControl.stop();
        console.log(this.state, 'should not be playing!')
      }

  }


  render() {
    const play = require('../../../img/play-icon.png');
    const pause = require('../../../img/pause-red.png');
    let playUri = !this.state.playing ? play : pause;
    return (
        <View>
          <Image source={require('../../../img/mouth.png')} style={styles.backgroundImage} />
          <View style={styles.playerContainer}>
            <TouchableOpacity onPress={this._onPressButton.bind(this)}>
              <Image
                  style={styles.button}
                  source={playUri}/>
            </TouchableOpacity>
          </View>
        </View>

    );
  }
}


const styles = {
  button: {
    height: 200,
    width: 200,
    zIndex: 1
  },
  playerContainer: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backgroundImage: {
    alignSelf: 'center',
    zIndex: -1,
    position: 'absolute',
    width: Dimensions.get('window').width/2,
    left: Dimensions.get('window').width/2 - Dimensions.get('window').width/4,
    height: Dimensions.get('window').height
  }
};
