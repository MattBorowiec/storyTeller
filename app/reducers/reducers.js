import {combineReducers} from 'redux-immutable';
import { Map } from 'immutable';
import { createStore } from 'redux';
import stories from './story_reducer';
import sequences from './sequence_reducer';


const initialState = Map();
const rootReducer = combineReducers({stories, sequences});

function makeStore() {
    return createStore(rootReducer, initialState);
}

const store = makeStore();

export default store;
