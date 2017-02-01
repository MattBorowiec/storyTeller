import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import StoryComponent from './StoryComponent.js';
import  Hr from 'react-native-hr';


class StoryList extends Component {

    renderStoryComponents() {
        return this.props.event_stories.map((story, i) => <StoryComponent key={story.public_url} name={'story' + i}
                                                                          index={i} url={story.public_url}
                                                                          duration={story.duration}
                                                                          event_time={this.props.event_time}
                                                                          event_location={this.props.event_location}/>)
    }

    render() {
        return (
            <View>
                <Text style={styles.headerText}>
                    <Text style={styles.eventLocation}>{this.props.event_location}</Text>
                    <Text style={styles.eventTime}> {this.props.event_time}</Text>
                </Text>
                <Hr lineColor="#7a7c7f"/>
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
    headerText: {
        fontFamily: "curious",
    },
    eventLocation: {
        color: "white",
        fontSize: 45,
        fontWeight: "bold"
    },
    eventTime: {
        color: "white",
        fontSize: 40
    },
};

export default StoryList;