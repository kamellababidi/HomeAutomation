import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Profile from './Profile';
import ChatBox from './ChatBox';
import Main from './Main';
import Controle from './Controle';
import Map from './map';

var MainScreenNavigator = TabNavigator({
    Profile: { screen: Profile },
    GoogleMap: { screen: Map },
    Controle: { screen: Controle },
    ChatBox: { screen: ChatBox },
    Main: {screen: Main}
});
MainScreenNavigator.navigationOptions = {
    title: 'please work'
};
export default MainScreenNavigator;
