import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import StoryComponent from './StoryComponent.js';
import Dimensions from 'Dimensions';
import { Colors, ThemeBorderColors, ThemeTintColors } from '../../stylesheets/theme';




class StoryList extends Component {
    constructor(props) {
        super(props)
    }


    renderStoryComponents() {
        return this.props.event_stories.map((story, i) => <StoryComponent key={story.public_url} name={'story' + i}
                                                                          index={i} url={story.public_url}
                                                                          duration={story.duration}
                                                                          event_time={this.props.event_time}
                                                                          event_location={this.props.event_location}
                                                                          color={this.props.color}/>)
    }

    renderFeaturedStories() {
        return this.props.featuredStories.map((featStory, i) => <StoryComponent key={'featStory' + i} name={'featStory' + i}
                                                                            index={i} url={featStory.public_url}
                                                                            duration={featStory.length_in_seconds}
                                                                            event_location={this.props.event_location}
                                                                            color={this.props.color}/>)

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    <Text style={[styles.eventLocation, {color: this.props.color}]}>{this.props.event_location}</Text>
                    <Text style={[styles.eventTime, {color: this.props.color}]}> {this.props.event_time}</Text>
                </Text>
                <Image style={{tintColor: this.props.color}} source={require("../../../img/chalk-hr-thin.png")}/>
                <View style={styles.scrollContainer}>
                    { this.props.isFeatured ?
                        this.renderFeaturedStories()
                        : this.renderStoryComponents()
                    }

                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        width: Dimensions.get("window").width - 30,
        marginBottom: 25
    },
    scrollContainer: {
        paddingLeft: 40,
        paddingRight: 40,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    headerText: {
        fontFamily: "curious"
    },
    eventLocation: {
        color: "white",
        fontSize: 45,
        fontWeight: "bold"
    },
    eventTime: {
        color: "white",
        fontSize: 40
    }
};

export default StoryList;