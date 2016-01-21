'use strict';

const {
  Animated,
  Easing,
  Dimensions,
  Image,
  TextInput,
  Text,
  LinkingIOS,
  TouchableHighlight,
  ScrollView,
  View,
} = React,
  LinearGradient = require('react-native-linear-gradient'),
  YouTube        = require('react-native-youtube'),
  LinkedIcon     = require('./LinkedIcon')

class IntroScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeInBody:    new Animated.Value(0),
      fadeInLogo:    new Animated.Value(0),
      fadeInHeader:  new Animated.Value(0),
      fadeInIcons:   new Animated.Value(0),
      flowerOpacity: new Animated.Value(0),
      upFlower:      new Animated.Value(0),
      youTubeReady:  false, // hidden until
    }
  }

  componentDidMount() {
    this.buildIn() // go!
  }

  buildIn() {
    const timing = Animated.timing, easing = Easing.out(Easing.quad)
    Animated.stagger(80, [
      timing(this.state.fadeInBody, {toValue: 1, duration: 100, easing }),
      timing(this.state.fadeInLogo, {toValue: 1, duration: 300}),
      timing(this.state.fadeInHeader, {toValue: 1, duration: 600, easing }),
      timing(this.state.fadeInIcons, {toValue: 1, duration: 1100, easing }),
    ]).start()
    Animated.stagger(100, [
      timing(this.state.flowerOpacity, {toValue: 1, duration: 700}),
      timing(this.state.upFlower, {toValue: -50, duration: 700, easing}),
    ]).start()
  }

  render() {
    const { onScroll = () => {} } = this.props
    return (
      <LinearGradient colors={['rgb(175,149,197)', 'rgb(209,109,132)']} style={styles.container} >
        <ScrollView style={styles.scroll} scrollEventThrottle={12} onScroll={(e) => {
          // flower scroll fx
          const y = e.nativeEvent.contentOffset.y,
           flowerOpacity = y <= 2
             ? 1            // show
             : y >= 400
                ? 0
                : 1 / (y / 25) // fast fade
          this.setState({upFlower: y, flowerOpacity})
        }}>
          <Animated.Image // flume logo
            source={require('./assets/logo.png')}
            resizeMode={Image.resizeMode.contain}
            style={[{opacity: this.state.fadeInLogo}, styles.logo]} />
          <Animated.Image // flower
            source     = {require('./assets/flower.png')}
            resizeMode = {Image.resizeMode.contain}
            style      = {[
              {
                opacity: this.state.flowerOpacity,
                transform: [{
                  translateY: this.state.upFlower,
                }],
              }, styles.flower]} />
          <Animated.View // bigger buttons
            style={{backgroundColor: 'transparent', opacity: this.state.fadeInHeader}}>
            <View style={styles.row}>
              <LinkedIcon href='https://store.futureclassic.com.au/collections/flume' style={[styles.button, styles.merch]}>
                <Text style={styles.buttonText}>MERCH</Text>
              </LinkedIcon>
              <LinkedIcon onPress={() => {}} style={[styles.button, styles.newsletter]}>
                <Text style={styles.buttonText}>NEWSLETTER</Text>
              </LinkedIcon>
            </View>
          </Animated.View>
          <Animated.View // social icon row
            style={{backgroundColor: 'transparent', opacity: this.state.fadeInIcons}}>
            <View style={[styles.row, styles.icons]}>
              <LinkedIcon icon='twitter'    href='https://twitter.com/flumemusic' />
              <LinkedIcon icon='facebook-f' href='https://www.facebook.com/flumemusic' />
              <LinkedIcon icon='instagram'  href='http://instagram.com/flumemusic' />
              <LinkedIcon icon='spotify'    href='https://open.spotify.com/artist/6nxWCVXbOlEVRexSbLsTer' />
              <LinkedIcon icon='soundcloud' href='https://soundcloud.com/flume' />
              <LinkedIcon icon='apple'      href='https://itunes.apple.com/au/artist/flume/id4275634?app=itunes' />
            </View>
          </Animated.View>
          <Animated.View // TODO songkick.com tour
            style={[styles.tourContainer, {opacity: this.state.fadeInBody}]}>
            <Text style={styles.tour}>TOUR</Text>
          </Animated.View>
          <Animated.View // TODO soundcloud.com "never be like you" ch00nz
          />
          <Animated.View // youtube (for now) "never be like you" ch00nz
            style={[styles.preview, {paddingTop: 0, marginBottom: grid * 2, borderWidth: 0, opacity: this.state.fadeInBody}]}>
            <YouTube
              ref='youtube'
              play={false}
              style={styles.youtube}
              videoId='Ly7uj0JwgKg'
              hidden={!this.state.youTubeReady}
              playsInline={true}
              onReady={() =>{this.setState({youTubeReady: true})}} />
          </Animated.View>
          <Animated.View // youtube "skin" ep ch00nz
            style={[styles.preview, {opacity: this.state.fadeInBody}]}>
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
          <Text style={styles.copy}>© FLUME {new Date().getFullYear()}  ●  SITE: MANUFACTUR X FLUME</Text>
        </ScrollView>
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
      opacity: 1,
    },
    scroll: {
      backgroundColor: 'transparent',
      padding: grid * 2.5,
      paddingTop: grid / 2,
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
      marginTop: 20,
      marginRight: -42, // stretch right-most item
    },
    tourContainer: {
      padding: grid,
      marginTop: height - (grid * 36),
      marginBottom: grid * 1.5,
      backgroundColor: themeColor,
    },
    tour: {
      letterSpacing: 3,
      fontSize: 50,
      color: textColor,
      alignSelf: 'center',
      fontWeight: '300',
    },
    preview: {
      padding: grid,
      marginTop: grid * 2,
      borderWidth: 1,
      borderColor:textColor,
      backgroundColor: themeColor,
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
    copy: {
      color: textColor,
      alignSelf: 'center',
      fontWeight: '300',
      fontSize: 11,
      marginTop: -grid * 7.5,
      marginBottom: grid * 4,
    },
    flower: {
      bottom: 300,
      position: 'absolute',
      width: width,
      backgroundColor: 'transparent',
    },
  })

module.exports = IntroScene
