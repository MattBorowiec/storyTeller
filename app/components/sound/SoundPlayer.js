import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import test from './Sound'
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'


// https://storage.googleapis.com/storybox-pdx/cde9b773-fb43-4d6c-9b8b-5813117c436a.mp3

export default class Player extends Component {
  constructor (props) {
    super(props)
    this.state ={
      playing: false
    }
  }
  componentWillMount() {
    RNFetchBlob
        .config({
          // DCIMDir is in external storage
          path : RNFetchBlob.fs.dirs.MusicDir + '/test.mp3'
        })
        .fetch('GET', 'https://storage.googleapis.com/storybox-pdx/cde9b773-fb43-4d6c-9b8b-5813117c436a.mp3')
        .then((res) => {
          console.log('The file saved to ', res.path())
          return RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ])
        })
        .then(() => {
          // scan file success
        })
        .catch((err) => {
          // scan file error
        })
  }

  _onPressButton() {
    if(!this.state.playing) {
      test.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
      this.setState({playing: true})
      console.log(this.state, 'should be playing!')
    } else {
      test.stop();
      this.setState({playing: false})
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
