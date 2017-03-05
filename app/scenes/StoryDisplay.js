import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import { connect } from 'react-redux';
import StoryList from '../components/story/StoryList';
import SideWindow from '../components/common/SideWindow';
import Dimensions from 'Dimensions';
import testJson from '../test.json';
import { Actions } from 'react-native-router-flux';
import { store } from '../index'

class StoryContainer extends Component {
    constructor(props) {
        super(props);
    }

    renderStoryLists() {
        return this.props.stories.map((event, i) => <StoryList key={i} event_time={event.event_time}
                                                               event_location={event.event_location}
                                                               event_stories={event.event_stories}
        />);
    }

    close() {
        Actions.popTo('Landing');
    }

    componentDidMount() {
        var id = setTimeout(()=> {
            this.close()
        }, 120000);
        store.dispatch({type: 'SET_TIMEOUT_ID', timeoutId: id});
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <TouchableOpacity style={styles.closeContainer} onPress={this.close.bind(this)}>
                    <Text style={styles.closePlayer}>X</Text>
                </TouchableOpacity>
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
        paddingTop: 30,
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
    },
    closePlayer: {
        color: "gray",
        fontSize: 50,
        fontFamily: "curious",
        marginBottom: 6,
        zIndex: 1
    },
    closeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: 50,
        height: 50,
        borderWidth: 4,
        borderRadius: 25,
        borderColor: "gray",
        top: 10,
        right: 15,
        zIndex: 2
    },
};


const mapStateToProps = (state) => {
    return {
        stories: state.get('stories'),
    }
};

export default connect(mapStateToProps)(StoryContainer);