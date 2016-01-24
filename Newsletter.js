
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
  Form = require('react-native-form'),

  validBorder     = '#383083',
  invalidBorder   = 'red',
  placeholderText = '#7870c3',

  timing = Animated.timing,
  easing = Easing.out(Easing.quad)

class Newsletter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // container defaults
      y:       new Animated.Value(0),
      opacity: new Animated.Value(1),
      backgroundColor: new Animated.Value(200),

      borderEmail: validBorder,
      borderZip:   validBorder,
    }
  }

  close() { // animate out
    Animated.stagger(0, [
      timing(this.state.y, {toValue: 100, duration: 200, easing}),
      timing(this.state.opacity, {toValue: 0, duration: 200, easing})])
        .start(this.props.onClose) // cb
  }

  componentDidMount() {
    timing(this.state.backgroundColor, {toValue: 300, duration: 400, easing}).start()
  }

  render() {
    const bgColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgba(90, 84, 185, 0)', 'rgba(90, 84, 185, .85)']
    })
    return (
        <Animated.View style={[{
          opacity: this.state.opacity,
          backgroundColor: bgColor,
          transform: [{
            translateY: this.state.y,
          }],
        }, styles.container]}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={this.close.bind(this)}>
            <Text style={[styles.header, styles.close]}>{Icon('check')}</Text>
          </TouchableHighlight>
          <Text style={styles.header}>MAILING LIST</Text>
          <Form ref='form'>
            <TextInput // email address
              name                 = {'email'}
              autoCapitalize       = {'characters'}
              autoCorrect          = {false}
              autoFocus            = {true}
              clearButtonMode      = {'while-editing'}
              keyboardType         = {'email-address'}
              placeholderTextColor = {placeholderText}
              style                = {[styles.input, {borderColor: this.state.borderEmail}]}
              placeholder          = {'EMAIL'} />
            <TextInput // zipcode
              name                 = {'zip'}
              autoCorrect          = {false}
              clearButtonMode      = {'while-editing'}
              keyboardType         = {'numeric'}
              placeholderTextColor = {placeholderText}
              style                = {[styles.input, {borderColor: this.state.borderZip}]}
              placeholder          = {'ZIPCODE'} />
          </Form>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => { // attempt subscribe:
              var {zip,email} = this.refs.form.getValues()
              // validate
              this.setState({borderEmail: email.indexOf('@') === -1 ? invalidBorder : validBorder})
              this.setState({borderZip: (zip.length < 5 || zip.match(/[^\d]/)) ? invalidBorder : validBorder})
              if (this.borderEmail === invalidBorder || this.borderZip === invalidBorder) return false // guard

              // ajax POST
              fetch('http://www.flumemusic.com/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  input_1: email,
                  input_2: zip,
                })
              }).then(function(res) {
                // TODO fun, friendly thank you
                if (res.status === 200) this.close()
                console.log('res: ', res, res.json())
              })
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
    padding: grid, // bigger click-area
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
    borderColor: validBorder,
    marginTop: grid,
  },
  button: {
    borderWidth: 1,
    borderColor: textColor,
    padding: 20,
    paddingVertical: 5,
    marginTop: grid * 3,
    fontSize: 15,
    letterSpacing: 1,
  }
})

module.exports = Newsletter
