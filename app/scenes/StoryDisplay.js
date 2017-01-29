import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import { connect } from 'react-redux';
import StoryList from '../components/story/StoryList';
import SideWindow from '../components/common/SideWindow';
import Dimensions from 'Dimensions';
import testJson from '../test.json';


class StoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            playing: false
        }
    }

    renderStoryLists() {
        return this.props.stories.map((event, i) => <StoryList key={i} event_time={event.event_time}
                                                     event_location={event.event_location}
                                                     event_stories={event.event_stories}/>);
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <SideWindow />
                <ScrollView
                    style={styles.scrollContainer}
                >

                    {this.renderStoryLists()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    listContainer: {
        zIndex: 2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "black"
    },
    backgroundImage: {
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: -1,
        position: 'absolute',
        width: Dimensions.get('window').width / 2,
        left: Dimensions.get('window').width / 2 - Dimensions.get('window').width / 4,
        top: 0,
        bottom: 0,
        opacity: .3
    },
    scrollContainer: {
        paddingLeft: 40
    }
};


const mapStateToProps = (state) => {
    return {
        stories: state.get('stories'),
    }
};

export default connect(mapStateToProps)(StoryContainer);