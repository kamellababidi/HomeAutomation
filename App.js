
import React from 'react';
import { StyleSheet, Text, View, Component, AppRegistry, TouchableHighlight, Button, Image,ontouchend, button, Navigator } from 'react-native';

import Login from './src/Login';
//import Signup from './src/Signup';

export default class App extends React.Component {

  render() {
    return (
    <Login />
    //<Signup />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
