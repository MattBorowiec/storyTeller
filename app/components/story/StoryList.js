import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import StoryComponent from './StoryComponent.js';
import  Hr from 'react-native-hr';
import Dimensions from 'Dimensions';
import { Colors, ThemeBorderColors, ThemeTintColors } from '../../stylesheets/theme';




class StoryList extends Component {
    constructor(props) {
        super(props)
    }


    renderStoryComponents() {
        const {event_stories, event_time, event_location, color, borderColor, tintColor} = this.props;
        return event_stories.map((story, i) => <StoryComponent key={story.public_url} name={'story' + i}
                                                                          index={i} url={story.public_url}
                                                                          duration={story.duration}
                                                                          event_time={event_time}
                                                                          event_location={event_location}
                                                                          color={color}
                                                                          borderColor={borderColor}
                                                                          tintColor={tintColor}/>)
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    <Text style={[styles.eventLocation, this.props.color]}>{this.props.event_location}</Text>
                    <Text style={[styles.eventTime, this.props.color]}> {this.props.event_time}</Text>
                </Text>
                <Image  style={this.props.tintColor} source={require("../../../img/chalk-hr-thin.png")} />
                <View style={styles.scrollContainer}>
                    {this.renderStoryComponents()}
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