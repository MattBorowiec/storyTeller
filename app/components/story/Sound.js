import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Sound from 'react-native-sound';

const StorySound = props => {

  return(
    new Sound(props.path, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        console.log('success, audio length is ' + sound.getDuration());
      }
    })
  )
};


export default StorySound
