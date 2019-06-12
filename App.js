import React, {Component} from 'react';
import Navigation from './src/Navigation/Navigation';

import {YellowBox} from 'react-native';
console.disableYellowBox = true;

class App extends Component {
  render() {
    return <Navigation />;
  }
}

export default App;