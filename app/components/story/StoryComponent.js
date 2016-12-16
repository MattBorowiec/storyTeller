import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound';
import { Actions } from 'react-native-router-flux';


class StoryComponent extends Component {
  constructor (props) {
    super(props);
    this.sound = false;
    this.path = null;
    this.state = {
      loading: true,
      playing: false
    };
  }

  componentWillMount() {
    // console.log(this.props);
    RNFetchBlob
        .config({
          // fileCache : true
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


  onPress(){
    console.log(this.sound);
    Actions.StoryPlayer({sound: this.sound});
  }


  render() {
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
          <TouchableOpacity
              onPress={this.onPress.bind(this)}
              style={{borderWidth: 2, borderColor: 'green'}}
          >
          <View style={{borderWidth: 2, borderColor: 'green', height: Dimensions.get('window').height/2.5, margin: 10, width: Dimensions.get('window').width/4}}>
            <Text style={{flex: 3}}>Here is where some blurb about the story goes. Blurb blurb... Blurb</Text>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 2, borderColor: 'green', alignItems: 'flex-end'}}>

              <Image
                  style={styles.button}
                  source={require('../../../img/gray-play.png')}/>
            <Text style={styles.soundLength}>{this.sound.getDuration()}</Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
    );
  };
};


const styles = {
  button: {
    height: 50,
    width: 50,
    zIndex: 1,
  },
  soundLength: {
    color: 'green',
    fontSize: 20
  }
};

export default StoryComponent;