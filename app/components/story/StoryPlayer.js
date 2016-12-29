import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView,  ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';


 class StoryPlayer extends Component {
  constructor (props) {
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
      })
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
    });
  }

   play() {
     if(!this.state.playing) {
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

    if (this.state.loading) {
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
  }
}

const styles = {
  playerContainer: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    height: 200,
    width: 200,
    zIndex: 1
  },
  backgroundImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: -1,
    position: 'absolute',
    width: Dimensions.get('window').width/2,
    left: Dimensions.get('window').width/2 - Dimensions.get('window').width/4,
    top: 0 ,
    bottom: 0
  }
};


const mapStateToProps = (state) => {
  return {
    stories: state.get('stories'),
  }
};

export default connect(mapStateToProps)(StoryPlayer);