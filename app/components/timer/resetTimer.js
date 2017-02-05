import { Actions } from 'react-native-router-flux';


class ResetTimer {
    constructor() {
        this.timer;
    }

    reset() {
        Actions.popTo('Landing');
    }

    start(timeOut) {
       clearTimeout(this.timer);
       this.timer = setTimeout(this.reset, timeOut);
    }

    stop() {
        clearTimeout(this.timer);
    }
}

var resetTimer = new ResetTimer();
export default resetTimer;

