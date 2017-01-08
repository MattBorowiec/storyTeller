import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import Dimensions from 'Dimensions';


class sideWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideValue: new Animated.Value(0),
    }
  }

  onPressLearnMore() {
    Alert.alert("WHAT DO???", "DA FUCK ARE WE DOIN WITH THIS BUTTON")
  }

  windowSlide() {
    if (!this.state.showing) {
      Animated.timing(
          this.state.slideValue,
          {
            duration: 1000,
            easing: Easing.elastic(0),
            toValue: 1
          }
      ).start();
      this.setState({showing: true})
    }
    if (this.state.showing) {
      Animated.timing(
          this.state.slideValue,
          {
            duration: 1000,
            easing: Easing.elastic(0),
            toValue: 0
          }
      ).start();
      this.setState({showing: false})
    }
  }

  render() {
    const left = this.state.slideValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-Dimensions.get('window').width / 3 + 5, 0]
    });

    const outArrow = require('../../../img/cheveron-right.png');
    const inArrow = require('../../../img/cheveron-left.png');
    let arrowURI = !this.state.showing ? outArrow : inArrow;

    return(
        <Animated.View style={[{left}, styles.infoWindow]}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextHeader}>This is Curious Ear...</Text>
            <Text></Text>
            <Text style={styles.infoTextBody}>
              A community engagement project, creating spaces for people to connect.
            </Text>
            <Text></Text>
            <Text style={styles.infoTextBody}>
              Here are voices from our community, recorded at various locations around our city.
            </Text>
            <Text></Text>
            <Text style={styles.infoTextBody}>
              The more we listen, the more we share, the better we understand our world.
            </Text>
            <Text></Text>
            <Text></Text>
            <TouchableOpacity
                style={styles.learnMoreContainer}
                onPress={this.onPressLearnMore.bind(this)}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <View style={{borderTopColor: "white", borderTopWidth: 1}}>
              <Text></Text>
              <Text style={styles.footerText}>curiousear.com</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.infoWindowButton}
                onPress={this.windowSlide.bind(this)}
            >
              <Image source={arrowURI} style={{height: 50, width: 35}}/>
            </TouchableOpacity>
          </View>
        </Animated.View>
    )
  }
}
const styles = {
  infoWindow: {
    position: 'absolute',
    zIndex: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0,
    bottom: 0
  },
  infoTextContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    backgroundColor: '#949494',
    padding: 20
  },
  infoTextHeader: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: 1,
    backgroundColor: '#949494'
  },
  infoWindowButton: {
    height: 50,
    width: 35
  },
  infoTextBody: {
    color: "white",
    fontSize: 20
  },
  learnMoreContainer: {
    borderColor: "white",
    borderWidth: 2
  },
  learnMoreText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  footerText: {
    color: "white",
    textAlign: "center"
  },
}

export default sideWindow;