import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';



 class StoryPlayer extends Component {
  constructor (props) {
    super(props);
    this.state ={
      storyCreated: false,
      playing: false
    }
  }

  componentDidMount() {
    console.log(this.props.sound)
  }

   play() {
     if(!this.state.playing) {
       this.props.sound.play(() => {console.log('done playing!')});
       this.setState({playing: true})
     } else {
       this.props.sound.pause();
       this.setState({playing: false});
     }
   };


  render() {
    const play = require('../../../img/play-icon.png');
    const pause = require('../../../img/pause-red.png');
    let playUri = !this.state.playing ? play : pause;
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