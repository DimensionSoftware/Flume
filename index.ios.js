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

// "stylesheet" theme variables
global.textColor  = '#fff'
global.themeColor = 'rgba(122,87,153,.7)'

const IntroScene = require('./IntroScene')

const app = React.createClass({
  render: function() {
    return <IntroScene />
  }
})

AppRegistry.registerComponent('flume', () => app)
