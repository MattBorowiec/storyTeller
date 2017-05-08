import { Animated, Easing } from 'react-native';


export function setTimeoutId(state, timeoutId) {
    return state.set('timeoutId', timeoutId);
};


export class ColorSequencer {
    constructor(colors) {
        this.outputColors = Array.from(colors);
        this.outputColors.push(colors[0]);
        this.inputRange = colors.map((item, index) => index);
        this.inputRange.push(colors.length);
        this.colorValue = new Animated.Value(0);
        this.colorValueInt = this.colorValue.interpolate({
            inputRange: this.inputRange,
            outputRange: this.outputColors
        });
    }


    start() {
        this.colorValue.setValue(0);
        Animated.timing(
            this.colorValue,
            {
                toValue: this.inputRange.length,
                duration: 5000,
                easing: Easing.linear

            }
        ).start(() => this.start())
    }
};



