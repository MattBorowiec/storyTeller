import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import StoryComponent from './StoryComponent.js'
import Dimensions from 'Dimensions';



 class StoryContainer extends Component {
  constructor (props) {
    super(props);
    this.state ={
      storyCreated: false,
      playing: false
    }
  }

  renderStoryComponents() {
    console.log(this.props.stories);
    return this.props.stories.map((story, i) => <View><StoryComponent key={story} url={story.public_url}/></View>)
  }


  render() {
    return (
        <View style={styles.playerContainer}>
          <Image source={require('../../../img/mouth.png')} style={styles.backgroundImage}/>
          <ScrollView
            horizontal={true}
          >
          {this.renderStoryComponents()}
          </ScrollView>
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


const mapStateToProps = (state) => {
  return {
    stories: state.get('stories'),
  }
};

export default connect(mapStateToProps)(StoryContainer);