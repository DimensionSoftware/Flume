
const {
  AsyncStorage,
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  LinkingIOS,
} = React,
  Icon    = require('react-native-iconic-font/fontawesome'),
  Form    = require('react-native-form'),

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
      enabled:     true,
    }
  }

  close() {
    // save
    this.setFormValue('email')
    this.setFormValue('zip')
     // animate out
    Animated.stagger(0, [
      timing(this.state.y, {toValue: 100, duration: 200, easing}),
      timing(this.state.opacity, {toValue: 0, duration: 200, easing})])
        .start(this.props.onClose) // cb
  }

  componentWillMount() { // XXX this janks a bit
    this.getInitialStateAsync().done()
  }

  componentDidMount() { // TODO wait for WillMount?  "blends" with fast animation:
    timing(this.state.backgroundColor, {toValue: 300, duration: 500, easing})
      .start()
  }

  async getInitialStateAsync() {
    const // from async storage
      email       = await AsyncStorage.getItem('email'),
      zip         = await AsyncStorage.getItem('zip')
      hasSignedUp = await AsyncStorage.getItem('hasSignedUp')
    this.setState({email, zip, hasSignedUp})
  }

  set(key, value) {
    AsyncStorage.setItem(key, value)
  }

  setFormValue(key) {
    if (!this.refs.form) return // guard
    this.set(key, this.refs.form.getValues()[key])
  }

  render() {
    const bgColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgba(90, 84, 185, 0)', 'rgba(90, 84, 185, .85)']
    }),
      headerText = this.state.hasSignedUp
        ? 'THANK YOU!'
        : 'MAILING LIST'
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
          <Text style={styles.header}>{headerText}</Text>
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
              onEndEditing         = {this.setFormValue.bind(this, 'email')}
              defaultValue         = {this.state.email}
              placeholder          = {'EMAIL'} />
            <TextInput // zipcode
              name                 = {'zip'}
              autoCorrect          = {false}
              clearButtonMode      = {'while-editing'}
              keyboardType         = {'numeric'}
              placeholderTextColor = {placeholderText}
              style                = {[styles.input, {borderColor: this.state.borderZip}]}
              onEndEditing         = {this.setFormValue.bind(this, 'zip')}
              defaultValue         = {this.state.zip}
              placeholder          = {'ZIPCODE'} />
          </Form>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => { // attempt subscribe:
              if (!this.refs.form) return // guard

              // validate
              var {zip,email} = this.refs.form.getValues()
              this.setState({borderEmail: email.indexOf('@') === -1 ? invalidBorder : validBorder})
              this.setState({borderZip: (zip.length < 5 || zip.match(/[^\d]/)) ? invalidBorder : validBorder})

              // guards
              if (this.state.borderEmail === invalidBorder || this.state.borderZip === invalidBorder) return false // guard
              if (!this.state.enabled) return // guard

              // ajax POST
              this.setState({enabled:false})
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
              }).then((res) => {
                // thank you
                if (res.status === 200) {
                  this.set('hasSignedUp', (new Date).toString()) // save time
                  this.setState({hasSignedUp: true})             // state
                  setTimeout(this.close.bind(this), 2000)        // close
                } else {
                  // TODO problem
                  console.log(`error from mailing list: ${res}`)
                  this.setState({enabled:true})
                }
              })
            }}
          >
            <Text style={[styles.header, styles.button, {
              borderColor: this.state.enabled ? textColor : darkThemeColor,
              color: this.state.enabled ? textColor : darkThemeColor}]}>SAVE</Text>
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
    fontFamily: 'Swiss721BT-Light',
    alignSelf: 'center',
    color: textColor,
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 4,
    marginBottom: grid,
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
    fontFamily: 'Swiss721BT-Light',
    backgroundColor: darkThemeColor,
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
    fontFamily: 'Swiss721BT-Light',
    borderColor: textColor,
    padding: 20,
    paddingVertical: 5,
    marginTop: grid * 3,
    fontSize: 17,
    letterSpacing: 1,
  }
})

module.exports = Newsletter
