import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import StoryComponent from './StoryComponent.js';
import  Hr from 'react-native-hr';



class StoryList extends Component {

  renderStoryComponents(){
    console.log(this.props.event_stories);
    return this.props.event_stories.map((story, i) => <StoryComponent key={story.public_url} name={'story' + i} index={i} url={story.public_url}/>)
  }

  render() {
    return (
        <View>
          <Text>
            <Text style={styles.eventLocation}>{this.props.event_location}</Text>
            <Text style={styles.eventTime}>{this.props.event_time}</Text>
          </Text>
          <Hr lineColor="#7a7c7f" />
          <ScrollView
              style={styles.scrollContainer}
              horizontal={true}
          >
            {this.renderStoryComponents()}
          </ScrollView>
        </View>
    )
  }
}

const styles = {
  scrollContainer: {
    paddingLeft: 40
  },
  eventLocation: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
  },
  eventTime: {
    color: "white",
    fontSize: 20
  },
};

export default StoryList;