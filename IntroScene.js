'use strict';

const {
  Animated,
  Dimensions,
  Image,
  TextInput,
  Text,
  TouchableHighlight,
  View,
} = React,
  LinearGradient = require('react-native-linear-gradient'),
  YouTube = require('react-native-youtube')

class IntroScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeInFlower:   new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.fadeInFlower() // go!
  }

  fadeInFlower() {
    Animated.timing(
      this.state.fadeInFlower,
      {toValue: 1, duration: 500},
    ).start()
  }

  render() {
    const { onScroll = () => {} } = this.props
    return (
      <LinearGradient colors={['rgb(175,149,197)', 'rgb(209,109,132)']} style={styles.container}>
        <Animated.View style={{backgroundColor: 'transparent', opacity: this.state.fadeInFlower}}>
          <Image source={require('./assets/logo.png')} resizeMode={Image.resizeMode.contain} style={styles.logo} />
          <Image source={require('./assets/flower.png')} resizeMode={Image.resizeMode.contain} style={styles.flower} />
          <View style={styles.row}>
            <TouchableHighlight style={styles.merch} underlayColor={themeColor}>
              <Text style={styles.buttonText}>MERCH</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.newsletter} underlayColor={themeColor}>
              <Text style={styles.buttonText}>NEWSLETTER</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
        <Animated.View style={{padding: grid, marginTop: grid * 2, backgroundColor: themeColor, opacity: this.state.fadeInFlower}}>
          <Text style={styles.tour}>TOUR</Text>
        </Animated.View>
        <Animated.View style={{padding: grid, marginTop: grid * 2, borderWidth: 1, borderColor:textColor, backgroundColor: themeColor, opacity: this.state.fadeInFlower}}>
          <Text style={styles.tour}>SKIN EP</Text>
          <Text style={styles.tour}>PREVIEW</Text>
          <YouTube videoId='Su9tda5VZDE' hidden={false} playsInline={true} />
        </Animated.View>
      <Image source={require('./assets/fc-logo.png')} resizeMode={Image.resizeMode.contain} style={styles.fc} />
      </LinearGradient>
    )
  }
}

const window = Dimensions.get('window'),
  grid       = 10,
  width      = window.width,
  styles     = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'column',
      padding: grid * 2.5,
      paddingTop: grid / 2,
      opacity: 1,
    },
    logo: {
      alignSelf: 'center',
      width: width - 50,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      marginTop: -grid,
    },
    merch: {
      flex: 1,
      borderWidth: 1,
      borderColor: textColor,
      padding: 5,
      paddingLeft: grid,
      paddingRight: grid,
      marginRight: grid / 2,
    },
    newsletter: {
      flex: 1,
      borderWidth: 1,
      borderColor: textColor,
      padding: 5,
      paddingLeft: grid,
      paddingRight: grid,
    },
    buttonText: {
      flex: 1,
      textAlign: 'center',
      fontWeight: '600',
      color: textColor,
    },
    tour: {
      letterSpacing: 3,
      fontSize: 40,
      color: textColor,
      alignSelf: 'center',
      fontWeight: '300',
    },
    box: {
      backgroundColor: themeColor,
    },
    fc: {
      width: 45,
      alignSelf: 'center',
    },
    flower: {
      top: -160,
      position: 'absolute',
      width: width,
      backgroundColor: 'transparent',
    },
  })

module.exports = IntroScene
