
import YouTube from 'react-native-youtube'

const {
  Dimensions,
  View,
  Text,
  Image,
} = Native,
  Icon = require('react-native-iconic-font/fontawesome')

class YouTubeVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false, // hidden until
    }
  }

  render() {
    return (
      <View style={this.props.style || []}>
        {this.state.ready || [
          <View key='placeholder' style={styles.placeholder}>
            <Image source={this.props.source} style={styles.image} resizeMode={Image.resizeMode.cover} />
            <View style={styles.circle}>
              <Text style={styles.play}>{Icon('play')}</Text>
            </View>
          </View>
        ]}
        <YouTube
          ref         = 'youtube'
          play        = {false}
          style       = {styles.youtube}
          videoId     = {this.props.videoId}
          hidden      = {!this.state.ready}
          playsInline = {true}
          origin      = {'http://youtube.com'}
          onReady     = {() => {
            this.setState({ready: true})
            if (this.props.onReady) // trigger ready!
              this.props.onReady()
          }} />
      </View>
    )
  }
}

// default style
const
  window = Dimensions.get('window'),
  width  = window.width,
  styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    opacity: .85,
    top: grid,
    right: grid,
    left: grid,
    bottom: grid,
    overflow: 'hidden',
  },
  image: { // clip edge pixles
    marginTop: grid * -1,
    marginLeft: -1,
  },
  play: {
    color: '#fff',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 25,
    fontFamily: 'fontawesome',
  },
  circle: {
    position: 'absolute',
    top: 50,
    left: (width / 2) - 75,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    height: 75,
    width: 75,
  },
  youtube: {
    alignSelf: 'stretch',
    height: 170,
    marginTop: grid,
    backgroundColor: textColor,
  },
})

module.exports = YouTubeVideo
