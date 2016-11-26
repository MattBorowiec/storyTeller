import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Slider } from 'react-native';
import StoryComponent from './StoryComponent.js'
import Dimensions from 'Dimensions';



export default class StoryPlayer extends Component {
  constructor (props) {
    super(props);
    this.state ={
      storyCreated: false,
      playing: false
    }
  }


  render() {
    return (
        <View style={styles.playerContainer}>
          <Image source={require('../../../img/mouth.png')} style={styles.backgroundImage}/>
          <StoryComponent url={'https://storage.googleapis.com/storybox-pdx/cde9b773-fb43-4d6c-9b8b-5813117c436a.mp3'} />
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
