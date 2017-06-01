import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Landing from '../scenes/Landing';
import StoryDisplay from '../scenes/StoryDisplay';
import StoryPlayer from '../scenes/StoryPlayer';
import IntroAnimation from '../scenes/IntroAnimation'


export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props)
  }



  render() {
    return <Router getSceneStyle={getSceneStyle}>
      <Scene key="root">
        <Scene duration={1000} hideNavBar={true} animation={'fade'} key="Landing" component={Landing} initial={true}/>
        <Scene duration={1000} hideNavBar={true} animation={'fade'} key="IntroAnimation" component={IntroAnimation} />
        <Scene duration={1000} hideNavBar={true} animation={'fade'} key="StoryDisplay" component={StoryDisplay} />
        <Scene duration={1000} hideNavBar={true} animation={'fade'} key="StoryPlayer" component={StoryPlayer} />
      </Scene>
    </Router>
  }
}

const getSceneStyle = ( props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#000000',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    return style;
};
