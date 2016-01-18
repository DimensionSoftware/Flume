/**
 * Flume
 * https://github.com/facebook/react-native
 */
'use strict';

// global static data for ease-of-use (dsl'y)
global.React = require('react-native')
const {
  Animated,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ListView,
  Navigator,
  NavigatorIOS,
  View,
  TouchableHighlight,
  StatusBarIOS
} = React
global.Component  = Component
global.StyleSheet = StyleSheet
global.Animated   = Animated

const IntroScene = require('./IntroScene')

const flume = React.createClass({
  render: function() {
    return <IntroScene />
  }
})

AppRegistry.registerComponent('flume', () => flume)
