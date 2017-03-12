import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Landing from '../scenes/Landing';
import StoryDisplay from '../scenes/StoryDisplay';
import StoryPlayer from '../scenes/StoryPlayer';
import IntroAnimation from '../scenes/IntroAnimation'
import IntroText from '../scenes/IntroText'


export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return <Router>
      <Scene key="root">
        <Scene hideNavBar={true} animation="fade" key="Landing" component={Landing} initial={true}/>
        <Scene hideNavBar={true} animation="fade" key="IntroText" component={IntroText} />
        <Scene hideNavBar={true} animation="fade" key="IntroAnimation" component={IntroAnimation} />
        <Scene hideNavBar={true} animation="fade" key="StoryDisplay" component={StoryDisplay} />
        <Scene hideNavBar={true} animation="fade" key="StoryPlayer" component={StoryPlayer} />
      </Scene>
    </Router>
  }
}
