
const {
  Animated,
  Text,
  TouchableHighlight,
  View,
  LinkingIOS,
} = React,
  Icon = require('react-native-iconic-font/fontawesome')

class LinkedIcon extends Component {
  render() {
    child = this.props.icon
      ? <Text style={styles.icon}>
          {Icon(this.props.icon)}
        </Text>
      : this.props.children

    return (
      <View style={[styles.row, styles.icons, this.props.style]}>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={() => {
            if (this.props.onPress) // custom press-handler
              this.props.onPress(arguments)
            else
              LinkingIOS.openURL(this.props.href)
          }}>
          {child}
        </TouchableHighlight>
      </View>
    )
  }
}

// default style
const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  icons: {
  },
  icon: {
    fontFamily: 'fontawesome',
    flex: 1,
    fontSize: 20,
    color: textColor
  },
})

module.exports = LinkedIcon
