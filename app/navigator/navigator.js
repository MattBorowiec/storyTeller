import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Landing from '../scenes/Landing';
import StoryDisplay from '../scenes/StoryDisplay';
import StoryPlayer from '../scenes/StoryPlayer';


export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return <Router>
      <Scene key="root">
        <Scene hideNavBar={true}  key="Landing" component={Landing} initial={true}/>
        <Scene hideNavBar={true} key="StoryDisplay" component={StoryDisplay} />
        <Scene hideNavBar={true} key="StoryPlayer" component={StoryPlayer} />
      </Scene>
    </Router>
  }
}
