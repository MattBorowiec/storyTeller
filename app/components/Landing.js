import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';



// https://storage.googleapis.com/storybox-pdx/cde9b773-fb43-4d6c-9b8b-5813117c436a.mp3

export default class Landing extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount() {

  }

  _onPressButton() {
    this.props.navigator.push({name: 'SoundPlayer'})
  }


  render() {
    const play = require('../../img/play-icon.png');
    return (
        <View>
          <Image source={require('../../img/background.jpeg')} style={styles.background} />
          <View style={styles.textContainer}>
            <Text style={[styles.text, {fontSize: 40}]}>Listening Matters</Text>
            <Text style={[styles.text, {fontSize: 35, marginBottom: 50}]}>Everyone deserves to be heard.
              Stories Connect us.</Text>
            <TouchableOpacity onPress={this._onPressButton.bind(this)}>
              <Text style={[styles.text, styles.listenButton]}>Tap to record yours.</Text>
            </TouchableOpacity>
          </View>
        </View>

    );
  }
}


const styles = StyleSheet.create({
  text: {
    color: '#d3d9df',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2
  },
  listenButton: {
    fontSize: 40,
    color: '#2f9c0a'
  },
  textContainer: {
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  background: {
    alignSelf: 'center',
    zIndex: -1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});
