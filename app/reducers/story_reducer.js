import {Map} from 'immutable';
import {setStories, setFeaturedStories} from '../core/story_core';


export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_STORIES':
      return setStories(state, action.state);
    case 'SET_FEATURED_STORIES':
      return setFeaturedStories(state, action.featuredStories);
  }
  return state;
}