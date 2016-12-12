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
    this.path = null;
    this.state = {
      length: null,
      loading: true,
      playing: false
    };
  }

  componentWillMount() {
    // console.log(this.props);
    RNFetchBlob
        .config({
          fileCache : true,
        })
        .fetch('GET', this.props.url)
        .then((res) => {
          // res.flush();
          // console.log('The file saved to ', res.path());
          this.path = res.path();
          return RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ])
        })
        .then(() => {
          this.sound = new Sound(this.path, '', (error) => {
            if (error) {
              console.log('failed to load the sound from path ', this.props.url, error);
            } else {
              console.log('success, audio length is ' + 'url is ' + this.props.url, this.sound.getDuration());
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
        <View>
          <TouchableOpacity onPress={this.play.bind(this)}>
            <Image
                style={styles.button}
                source={playUri}/>
          </TouchableOpacity>
        </View>
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