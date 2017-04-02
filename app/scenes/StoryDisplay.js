import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableHighlight, ScrollView, Animated, Easing, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import StoryList from '../components/story/StoryList';
import SideWindow from '../components/common/SideWindow';
import Dimensions from 'Dimensions';
import testJson from '../test.json';
import { Actions } from 'react-native-router-flux';
import { store } from '../index'
import { fetchStories } from '../core/story_core'

class StoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page_number: 0,
            is_loading: false,
        }
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

    previousPage() {
        this.setState({is_loading: true});
        if (this.state.page_number > 0) {
            fetchStories(this.state.page_number - 1).done((stories) => {
                store.dispatch({type: 'SET_STORIES', state: stories});
                this.setState({page_number: this.state.page_number - 1, is_loading: false});
            });
        } else {
            fetchStories().done((stories) => {
                store.dispatch({type: 'SET_STORIES', state: stories});
                this.setState({page_number: 0, is_loading: false});
            });
        }
    }

    nextPage() {
        this.setState({is_loading: true});
        fetchStories(this.state.page_number + 1).done((stories) => {
            if (stories.length === 0) {
                return this.setState({is_loading: false});
            }
            store.dispatch({type: 'SET_STORIES', state: stories});
            this.setState({page_number: this.state.page_number + 1, is_loading: false});
        });
    }

    render() {
        var scrollView = null;
        if (this.state.is_loading) {
            scrollView =
                <View style={{flex: 7}}>
                    <ActivityIndicator
                        animating={true}
                        style={styles.loadingSpinner}
                        color="green"
                        size={200}
                    />
                </View>
        } else {
            scrollView =
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStlye={{flexDirection: "column", alignItems: "center"}}
                >

                    {this.renderStoryLists()}
                </ScrollView>
        }

        // TODO If thre is no empty text field below {scrollView}, the pagination controls won't render. Bug?
        // TODO Figure out why element directly below scrollView is disappearing
        return (
            <View style={styles.listContainer}>
                <SideWindow />
                {scrollView}
                <Text>WHY THIS DISAPPEAR?!?!</Text>
                <View style={styles.paginationContainer}>
                    <TouchableHighlight onPress={this.previousPage.bind(this)} disabled={this.state.is_loading}>
                        <Image style={styles.pageArrowImg} source={require('../../img/cheveron-left.png')}/>
                    </TouchableHighlight>
                    <Text style={styles.paginationText}>Page</Text>
                    <Text style={styles.paginationPageNumber}>{this.state.page_number}</Text>
                    <TouchableHighlight onPress={this.nextPage.bind(this)} disabled={this.state.is_loading}>
                        <Image style={styles.pageArrowImg} source={require('../../img/cheveron-right.png')}/>
                    </TouchableHighlight>
                </View>
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
        flex: 7,
        paddingLeft: 40
    },
    paginationContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 4,
        flexDirection: "row"
    },
    paginationText : {
        fontFamily: "curious",
        fontSize: 60,
        padding: 20
    },
    paginationPageNumber: {
        fontFamily: "curious",
        fontSize: 100,
        paddingBottom: 45,
        paddingRight: 20
    },
    pageArrowImg: {
        height : 60,
        width: 60,
        borderWidth: 1
    },
    loadingSpinner: {
        height: 150,
        width: 150,
        paddingLeft: 40,
        paddingTop: Dimensions.get('window').height / 3
    }
};


const mapStateToProps = (state) => {
    return {
        stories: state.get('stories'),
    }
};

export default connect(mapStateToProps)(StoryContainer);