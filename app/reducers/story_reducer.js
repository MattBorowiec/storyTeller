import {Map} from 'immutable';
import {setStories, setTimeoutId} from '../core/story_core';


export default function(state = Map({}), action) {
  switch (action.type) {
    case 'SET_STORIES':
      return setStories(state, action.state);
    case 'SET_TIMEOUT_ID':
      clearTimeout(state.get('timeoutId'));
      return setTimeoutId(state, action.timeoutId);
  }
  return state;
}