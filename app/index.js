import React, { Component } from 'react';
import { View } from 'react-native';
import {Provider} from 'react-redux';
import { createStore} from 'redux';
import StoryReducer from './reducers/story_reducer';
import  Navigator  from './navigator/navigator';
import {fetchStories, fetchFeaturedStories} from './core/story_core';

export const store = createStore(StoryReducer);



export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //initial story fetching on app load
    fetchStories().done((stories) => {
      store.dispatch({type: 'SET_STORIES', state: stories});
    });

    fetchFeaturedStories().done((featuredStories) => {
      store.dispatch({type: 'SET_FEATURED_STORIES', featuredStories: featuredStories});
    });


  }

  render() {
    return (
        <View style={styles.touchResponder} >
            <Provider store={store}>
                <Navigator />
            </Provider>
        </View>
    );
  }
}


const styles = {
    touchResponder: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
}