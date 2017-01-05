import { View, Image, Text, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class StoryComponent extends Component {
  constructor (props) {
    super(props);
    this.path = null;
  }

  onPress() {
    Actions.StoryPlayer({url: this.props.url, name: this.props.name, eventLocation: '  Spaceness', eventTime: '  February 32nd, 3017'});
  }

  render() {
    return (
        <View>
          <TouchableOpacity
              onPress={this.onPress.bind(this)}
              style={{borderWidth: 2, borderColor: 'green'}}
          >
          <View style={styles.storyContainer}>
            <View style={styles.blurbContainer}>
              <Text style={styles.soundBlurb}>Here is where some a published blurb about the story will go. Blurb blurb... Blurb</Text>
            </View>
            <View style={styles.playBar}>
              <Image
                  style={styles.button}
                  source={require('../../../img/gray-play.png')}/>
            <Text style={styles.soundLength}>sound duration prop</Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
    );
  };
};


const styles = {
  storyContainer: {
    borderWidth: 2,
    borderColor: 'green',
    height: Dimensions.get('window').height/2.5, margin: 10,
    width: Dimensions.get('window').width/4,
  },
  button: {
    height: 50,
    width: 50,
    zIndex: 1,
  },
  blurbContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  soundBlurb : {
    color: 'green',
    fontSize: 18
  },
  playBar: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  soundLength: {
    color: 'green',
    fontSize: 18
  }
};

export default StoryComponent;