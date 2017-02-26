/**
 * Flume
 * https://github.com/facebook/react-native
 */
'use strict';

// global static data for ease-of-use (dsl'y)
global.React = require('react')
global.Native = require('react-native')
const {
  Animated,
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Navigator,
  NavigatorIOS,
  View,
  TouchableHighlight,
  StatusBarIOS
} = Native
global.Component  = React.Component
global.StyleSheet = StyleSheet
global.Animated   = Animated

// "stylesheet" theme variables
global.grid           = 10,
global.textColor      = '#fff'
global.themeColor     = 'rgba(122,87,153,.7)'
global.darkThemeColor = '#484093'
global.fontFamily     = 'Swiss721BT-Light'

const IntroScene = require('./src/IntroScene')

const app = React.createClass({
  render: function() {
    return <IntroScene />
  }
})

AppRegistry.registerComponent('flume', () => app)
