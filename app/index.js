import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { createStore} from 'redux';
import  Navigator  from './navigator/navigator';

const store = createStore();

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <Provider store={store}>
          <Navigator/>
        </Provider>
    );
  }
}
