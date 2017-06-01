import {Map} from 'immutable';
import  {setTimeoutId} from '../core/sequence_core';

export default function (state = Map({}), action) {
    switch(action.type) {
        case 'SET_TIMEOUT_ID':
            clearTimeout(state.get('timeoutId'));
            return setTimeoutId(state, action.timeoutId);
    }
    return state;
}