import { Animated } from 'react-native';

export function setTimeoutId(state, timeoutId) {
    return state.set('timeoutId', timeoutId);
}

export function setColorValues(state, colorValues) {
    return state.set('colorValues', colorValues );
}


export class ColorSequencer {
    constructor(store, colors) {
        this.store = store;
        this.colors = Object.keys(colors).map((item, key) => {
            return colors[key];
        });
        this.colorValue = new Animated.Value(0);
        this.colorAnimations = Object.keys(colors).map((item, key) => {
            return Animated.timing(
                this.colorValue,
                {
                    toValue: key,
                    duration: 50
                }
            )
        });
        this.colorValueInt = this.colorValue.interpolate({
            inputRange: [ ...Object.keys(this.colors)],
            outputRange: [ ...this.colors ]
        });
    }

    start = function() {
        Animated.sequence(this.colorAnimations).start(() => this.start());
    };
    setColorValues = function() {
        this.store.dispatch({type: 'SET_COLOR_VALUES', colorValues: this.colorValueInt})
    };
}

