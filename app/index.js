import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { createStore} from 'redux';
import StoryReducer from './reducers/story_reducer';
import  Navigator  from './navigator/navigator';
import {fetchStories} from './core/story_core';

const store = createStore(StoryReducer);

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    fetchStories().done((stories) => {
      store.dispatch({type: 'SET_STORIES', state: stories});
    });
  }

  render() {
    return (
        <Provider store={store}>
          <Navigator/>
        </Provider>
    );
  }
}
