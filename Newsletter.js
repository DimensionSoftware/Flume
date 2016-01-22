
const {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  LinkingIOS,
} = React,
  Icon = require('react-native-iconic-font/fontawesome'),
  {VibrancyView} = require('react-native-blur')

class Newsletter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y:       new Animated.Value(0),
      opacity: new Animated.Value(1),
    }
  }

  render() {
    return (
        <Animated.View style={[{
          opacity: this.state.opacity,
          transform: [{
            translateY: this.state.y,
          }],
        }, styles.container]}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => {
              // animate out
              const timing = Animated.timing,
                easing = Easing.out(Easing.quad)
              Animated.stagger(0, [
                timing(this.state.y, {toValue: 100, duration: 200, easing }),
                timing(this.state.opacity, {toValue: 0, duration: 200, easing })])
                  .start(this.props.onClose) // cb
            }}>
            <Text style={[styles.header, styles.close]}>{Icon('check')}</Text>
          </TouchableHighlight>
          <Text style={styles.header}>MAILING LIST</Text>
          <TextInput // email address
            autoCapitalize       = {'characters'}
            autoCorrect          = {false}
            autoFocus            = {true}
            keyboardType         = {'email-address'}
            placeholderTextColor = {'#7870c3'}
            style                = {styles.input}
            placeholder          = {'EMAIL'} />
          <TextInput // zipcode
            autoCorrect          = {false}
            keyboardType         = {'numeric'}
            placeholderTextColor = {'#7870c3'}
            style                = {styles.input}
            placeholder          = {'ZIPCODE'} />
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => { // TODO subscribe
              // TODO ajax POST
              // TODO fun, friendly thank you
            }}
          >
            <Text style={[styles.header, styles.button]}>SAVE</Text>
          </TouchableHighlight>
        </Animated.View>
    )
  }
}

// default style
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(90,84,185,0.85)',
    top: 0,
    marginTop: -220,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
  },
  header: {
    alignSelf: 'center',
    color: textColor,
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 4,
  },
  close: {
    fontFamily: 'fontawesome',
    marginBottom: grid * 2,
  },
  input: {
    height: 40,
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#484093',
    padding: 15,
    paddingVertical: 10,
    color: textColor,
    fontWeight: '300',
    borderWidth: 1,
    borderColor: '#383083',
    marginTop: grid,
  },
  button: {
    borderWidth: 1,
    borderColor: textColor,
    padding: 20,
    paddingVertical: 5,
    marginTop: grid,
    fontSize: 15,
    letterSpacing: 1,
  }
})

module.exports = Newsletter
