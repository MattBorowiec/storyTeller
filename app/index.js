import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Landing from './components/Landing';
import SoundPlayer from './components/sound/SoundPlayer';

var ROUTES = {
  Landing: Landing,
  SoundPlayer: SoundPlayer
}

export default class App extends Component {
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator}/>
  }
  render() {
    return (
        <Navigator
            initialRoute={{ name: 'Landing'}}
            renderScene={this.renderScene}
            configureScene={() => {
              return Navigator.SceneConfigs.FadeAndroid
            }}
        />
    );
  }
}
