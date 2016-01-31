'use strict';

const {
  Animated,
  Easing,
  Dimensions,
  Image,
  TextInput,
  Text,
  TouchableHighlight,
  LinkingIOS,
  ScrollView,
  View,
} = React,
  LinearGradient = require('react-native-linear-gradient'),
  YouTube        = require('react-native-youtube'),
  color          = require('color'),
  LinkedIcon     = require('./LinkedIcon'),
  Newsletter     = require('./Newsletter'),
  TourDates      = require('./TourDates'),

  flowerOffset = -86,  // offset from bottom
  flowerMax    = 180   // offset before disappear

class IntroScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeInLogo:     new Animated.Value(0),
      fadeInHeader:   new Animated.Value(0),
      fadeInIcons:    new Animated.Value(0),
      flowerOpacity:  new Animated.Value(0),
      upFlower:       new Animated.Value(0),
      youTubeReady:   false, // hidden until
      showNewsletter: false,
    }
  }

  componentDidMount() {
    setTimeout(this.buildIn.bind(this), 1) // yield & go!
  }

  buildIn() { // fluidly fade-in scene, riffs off flumemusic.com
    const timing = Animated.timing, easing = Easing.out(Easing.quad)
    Animated.stagger(80, [
      timing(this.state.fadeInLogo,   {toValue: 1, duration: 800}),
      timing(this.state.fadeInHeader, {toValue: 1, duration: 1200, easing }),
      timing(this.state.fadeInIcons,  {toValue: 1, duration: 1600, easing }),
    ]).start()
    Animated.stagger(100, [
      timing(this.state.flowerOpacity, {toValue: 1, duration: 1100}),
      timing(this.state.upFlower,      {toValue: flowerOffset, duration: 1200, easing}),
    ]).start()
  }

  render() { // TODO refactor flower & header into individual classes
    const { onScroll = () => {} } = this.props,
      newsletter = // toggles visibility
        this.state.showNewsletter
          ? <Newsletter
            onClose={() => { // close!
              this.setState({showNewsletter: false })
            }} />
          : null // closed state
    return (
      <LinearGradient colors={['rgb(175,149,197)', 'rgb(209,109,132)']} style={styles.container}>
        <Animated.Image // flower
          renderToHardwareTextureAndroid = {true}
          shouldRasterizeIOS             = {true}
          source                         = {require('./assets/flower.png')}
          resizeMode                     = {Image.resizeMode.contain}
          style                          = {[
            {
              opacity: this.state.flowerOpacity,
              transform: [{
                translateY: this.state.upFlower,
              }],
            }, styles.flower]} />
        <ScrollView style={styles.scroll} scrollEventThrottle={16} onScroll={(e) => {
          // flower scroll fx
          const y = e.nativeEvent.contentOffset.y,
            yParallaxFactor = y / 3 + flowerOffset,
            flowerOpacity   = y <= 4
              ? 1              // show
              : yParallaxFactor >= flowerMax // hard limit to disappear
                ? 0
                : 1 / (y / 70) // fast fade
          this.setState({
            upFlower: yParallaxFactor <= flowerOffset
              ? -(yParallaxFactor - flowerOffset * 2) // exceeded top, so-- snap-bounce back down (instead of up)
              : yParallaxFactor,                      // usual parallax downward
            flowerOpacity})
        }}>
          <Animated.Image // flume logo
            source={require('./assets/logo.png')}
            resizeMode={Image.resizeMode.contain}
            style={[{opacity: this.state.fadeInLogo}, styles.logo]} />
          <Animated.View // bigger buttons
            style={{backgroundColor: 'transparent', opacity: this.state.fadeInHeader}}>
            <View style={styles.row}>
              <LinkedIcon href='https://store.futureclassic.com.au/collections/flume' style={[styles.button, styles.merch]}>
                <Text style={styles.buttonText}>MERCH</Text>
              </LinkedIcon>
              <LinkedIcon
                onPress={() => { // toggle newsletter modal
                  this.setState({showNewsletter: !this.state.showNewsletter})
                }}
                style={[styles.button, styles.newsletter]}>
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
          <TourDates />
          <Image source={require('./assets/sk.png')} resizeMode={Image.resizeMode.contain} style={styles.sk} />
          <Animated.View // youtube "smoke and retribution" ch00nz
            style={[styles.preview, {paddingTop: 0, marginBottom: grid * 2, borderWidth: 0}]}>
            <YouTube
              ref='youtube'
              play={false}
              style={styles.youtube}
              videoId='4fAzM5cI5FM'
              hidden={!this.state.youTubeReady}
              playsInline={true}
              onReady={() =>{this.setState({youTubeReady: true})}} />
          </Animated.View>
          <Animated.View // youtube (for now) "never be like you" ch00nz
            style={[styles.preview, {paddingTop: 0, marginBottom: grid * 2, borderWidth: 0}]}>
            <YouTube
              ref='youtube'
              play={false}
              style={styles.youtube}
              videoId='Ly7uj0JwgKg'
              hidden={!this.state.youTubeReady}
              playsInline={true}
              onReady={() =>{this.setState({youTubeReady: true})}} />
          </Animated.View>
          <View // youtube "skin" ep ch00nz
            style={[styles.preview, {backgroundColor: color(darkThemeColor).lighten(.2).clearer(.8).rgbaString()}]}>
            <Text style={styles.header}>SKIN EP</Text>
            <Text style={styles.header}>PREVIEW</Text>
            <YouTube
              ref='youtube'
              play={false}
              style={[styles.youtube,{marginTop: grid * 2}]}
              videoId='Su9tda5VZDE'
              hidden={!this.state.youTubeReady}
              playsInline={true}
              onReady={() =>{this.setState({youTubeReady: true})}} />
          </View>
          <Image source={require('./assets/fc-logo.png')} resizeMode={Image.resizeMode.contain} style={styles.fc} />
          <Text style={styles.copy}>© FLUME {new Date().getFullYear()}  ●  SITE: MANUFACTUR X FLUME</Text>
        </ScrollView>
        {newsletter}
      </LinearGradient>
    )
  }
}

const window = Dimensions.get('window'),
  height     = window.height,
  width      = window.width,
  styles     = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'column',
      paddingTop: 20,
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
      borderWidth: 1,
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
      fontFamily,
      textAlign: 'center',
      fontWeight: '600',
      color: textColor,
    },
    icons: {
      marginTop: 20,
      marginRight: -14, // stretch right-most item
      marginLeft: -14,  // " left-most
    },
    header: {
      fontFamily,
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
      borderColor: color(textColor).clearer(.6).rgbaString(),
      backgroundColor: color(themeColor).darken(.05).rgbString(),
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
      fontFamily,
      color: textColor,
      alignSelf: 'center',
      fontWeight: '300',
      fontSize: 11,
      marginTop: -grid * 7.5,
      marginBottom: grid * 4,
    },
    flower: {
      position: 'absolute',
      width: width,
      backgroundColor: 'transparent',
    },
    sk: {
      alignSelf: 'center',
      height: 20,
      flex: 1,
      marginVertical: grid * 2,
    },
  })

module.exports = IntroScene
