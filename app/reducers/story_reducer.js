import {Map} from 'immutable';
import {setStories} from '../core/story_core';


export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_STORIES':
      return setStories(state, action.state);
  }
  return state;
}