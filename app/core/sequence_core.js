import { Animated, Easing } from 'react-native';
import { Colors } from '../stylesheets/theme';


export function setTimeoutId(state, timeoutId) {
    return state.set('timeoutId', timeoutId);
};


class ColorSequencer {
    constructor(colors) {
        this.outputColors = Array.from(colors);
        //have to push in transition to beginning of loop to avoid break in animation
        this.outputColors.push(colors[0]);
        this.inputRange = colors.map((item, index) => index);
        //have to push in transition to beginning of loop to avoid break in animation
        this.inputRange.push(colors.length);
        this.colorValue = new Animated.Value(0);
        this.colorValueInt = this.colorValue.interpolate({
            inputRange: this.inputRange,
            outputRange: this.outputColors
        });
        this.startColorSequence();
    }


     startColorSequence() {
        this.colorValue.setValue(0);
        Animated.timing(
            this.colorValue,
            {
                toValue: this.inputRange.length,
                duration: 10000,
                easing: Easing.linear

            }
        ).start(() => this.startColorSequence())
    }
};

export const colorSequencer = new ColorSequencer(Colors);



