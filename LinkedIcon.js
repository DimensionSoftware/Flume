
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
    return (
      <View style={[styles.row, styles.icons]}>
        <TouchableHighlight underlayColor={themeColor} onPress={() =>
          LinkingIOS.openURL(this.props.href)
        }>
          <Text style={styles.icon}>
            {Icon(this.props.icon)}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  icons: {
    marginTop: 20,
    marginRight: -42, // stretch right-most item
  },
  icon: {
    fontFamily: 'fontawesome',
    flex: 1,
    fontSize:20,
    color: textColor
  },
})

module.exports = LinkedIcon
