import React, { Component } from 'react';
import { Navigator } from 'react-native';
import Landing from './components/Landing';
import StoryPlayer from './components/story/StoryPlayer';

var ROUTES = {
  Landing: Landing,
  StoryPlayer: StoryPlayer
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
