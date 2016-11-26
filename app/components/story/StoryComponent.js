import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';

class StoryComponent extends Component {
  constructor (props) {
    super(props);
    this.sound = false;
    this.res = null;
    this.state = {
      path: null,
      length: null,
      loading: true,
      playing: false
    };
  }

  componentWillMount() {
    RNFetchBlob
        .config({
          fileCache : true,
        })
        .fetch('GET', this.props.url)
        .then((res) => {
          console.log('The file saved to ', res.path());
          this.setState({path: res.path()});
          return RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ])
        }).then(() => {
          this.sound = new Sound(this.state.path, '', (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            } else {
              console.log('success, audio length is ' + this.sound.getDuration());
              this.setState({loading: false, length: this.sound.getDuration()});
            }
          });
    })
  }

  play() {
    if(!this.state.playing) {
      this.sound.play(() => {console.log('done playing!')});
      this.setState({playing: true})
    } else {
      this.sound.pause();
      this.setState({playing: false});
    }
  };


  render() {
    const play = require('../../../img/play-icon.png');
    const pause = require('../../../img/pause-red.png');
    let playUri = !this.state.playing ? play : pause;
    if (this.state.loading){
     return <ActivityIndicator
          animating={true}
          style={styles.button}
          color="green"
          size={100}
      />
    }
    return (
        <TouchableOpacity onPress={this.play.bind(this)}>
          <Image
              style={styles.button}
              source={playUri}/>
        </TouchableOpacity>
    );
  };
};


const styles = {
  button: {
    height: 200,
    width: 200,
    zIndex: 1
  }
};

export default StoryComponent;