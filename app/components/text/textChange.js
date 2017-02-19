import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';


class TextChange extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.initialText == true) {
            return (
                <View>
                    <Text style={styles.text}>
                        Here are voices from our communities,
                    </Text>
                    <Text style={styles.text}>
                        recorded at various Ears around our city.
                    </Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={styles.text}>
                        The more we communicate, the better we understand.
                    </Text>
                    <Text style={styles.text}>
                        The less we fear, the more we love.
                    </Text>
                </View>
            )
        }
    };
}



const styles = StyleSheet.create({
    text: {
        color: "white",
        fontFamily: "curious",
        fontSize: 40
    }
});

export default TextChange;