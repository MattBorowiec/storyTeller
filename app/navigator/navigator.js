import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
// import { Navigator } from 'react-native';
import Landing from '../components/Landing';
import StoryPlayer from '../components/story/StoryPlayer';


export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Router>
      <Scene key="root">
        <Scene hideNavBar={true}  key="Landing" component={Landing} initial={true}/>
        <Scene hideNavBar={true} key="StoryPlayer" component={StoryPlayer} />
      </Scene>
    </Router>
  }
}
