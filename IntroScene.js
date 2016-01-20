'use strict';

const {
  Animated,
  Dimensions,
  Image,
  TextInput,
  Text,
  LinkingIOS,
  TouchableHighlight,
  View,
} = React,
  LinearGradient = require('react-native-linear-gradient'),
  YouTube        = require('react-native-youtube'),
  LinkedIcon     = require('./LinkedIcon')

class IntroScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeUpFlower: new Animated.Value(0),
      youTubeReady: false,
    }
  }

  componentDidMount() {
    this.fadeUpFlower() // go!
  }

  fadeUpFlower() {
    Animated.timing(
      this.state.fadeUpFlower,
      {toValue: 1, duration: 350},
    ).start()
  }

  render() {
    const { onScroll = () => {} } = this.props
    return (
      <LinearGradient colors={['rgb(175,149,197)', 'rgb(209,109,132)']} style={styles.container}>
        <Image source={require('./assets/logo.png')} resizeMode={Image.resizeMode.contain} style={styles.logo} />
        <Image source={require('./assets/flower.png')} resizeMode={Image.resizeMode.contain} style={styles.flower} />
        <Animated.View style={{backgroundColor: 'transparent', opacity: this.state.fadeUpFlower}}>
          <View style={styles.row}>
            <TouchableHighlight style={[styles.button, styles.merch]} underlayColor={themeColor} onPress={() =>
              LinkingIOS.openURL('https://store.futureclassic.com.au/collections/flume')
            }>
              <Text style={styles.buttonText}>MERCH</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, styles.newsletter]} underlayColor={themeColor}>
              <Text style={styles.buttonText}>NEWSLETTER</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.row, styles.icons]}>
            <LinkedIcon icon='twitter'    href='https://twitter.com/flumemusic' />
            <LinkedIcon icon='facebook-f' href='https://www.facebook.com/flumemusic' />
            <LinkedIcon icon='instagram'  href='http://instagram.com/flumemusic' />
            <LinkedIcon icon='spotify'    href='https://open.spotify.com/artist/6nxWCVXbOlEVRexSbLsTer' />
            <LinkedIcon icon='soundcloud' href='https://soundcloud.com/flume' />
            <LinkedIcon icon='apple'      href='https://itunes.apple.com/au/artist/flume/id4275634?app=itunes' />
          </View>
        </Animated.View>
        <Animated.View style={[styles.tourContainer, {opacity: this.state.fadeUpFlower}]}>
          <Text style={styles.tour}>TOUR</Text>
        </Animated.View>
        <Animated.View style={{padding: grid, marginTop: grid * 2, borderWidth: 1, borderColor:textColor, backgroundColor: themeColor, opacity: this.state.fadeUpFlower}}>
          <Text style={styles.tour}>SKIN EP</Text>
          <Text style={styles.tour}>PREVIEW</Text>
          <YouTube
            ref='youtube'
            play={false}
            style={styles.youtube}
            videoId='Su9tda5VZDE'
            hidden={!this.state.youTubeReady}
            playsInline={true}
            onReady={() =>{this.setState({youTubeReady: true})}} />
        </Animated.View>
        <Image source={require('./assets/fc-logo.png')} resizeMode={Image.resizeMode.contain} style={styles.fc} />
      </LinearGradient>
    )
  }
}

const window = Dimensions.get('window'),
  grid       = 10,
  height     = window.height,
  width      = window.width,
  styles     = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
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
    button: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: textColor,
      padding: 5,
      paddingLeft: grid,
    },
    merch: {
      paddingRight: grid,
      marginRight: grid / 2,
    },
    newsletter: {
      paddingLeft: grid,
      paddingRight: grid,
    },
    buttonText: {
      flex: 1,
      textAlign: 'center',
      fontWeight: '600',
      color: textColor,
    },
    icons: {
      marginTop: 0,
      marginRight: -42, // stretch right-most item
    },
    icon: {
      fontFamily: 'fontawesome',
      flex: 1,
      fontSize:20,
      color: textColor
    },
    tourContainer: {
      padding: grid,
      marginTop: height - (grid * 35),
      backgroundColor: themeColor,
    },
    tour: {
      letterSpacing: 3,
      fontSize: 40,
      color: textColor,
      alignSelf: 'center',
      fontWeight: '300',
    },
    youtube: {
      alignSelf: 'stretch',
      height: 170,
      marginTop: grid,
      backgroundColor: textColor,
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
