
const {
  Dimensions,
  View,
} = React,
  YouTube = require('react-native-youtube')

class YouTubeVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false, // hidden until
    }
  }

  render() {
    return (
      <View
        style={this.props.style || []}>
        <YouTube
          ref='youtube'
          play={false}
          style={styles.youtube}
          videoId={this.props.videoId}
          hidden={!this.state.ready}
          playsInline={true}
          onReady={() =>{this.setState({ready: true})}} />
      </View>
    )
  }
}

// default style
const
  styles = StyleSheet.create({
  youtube: {
    alignSelf: 'stretch',
    height: 170,
    marginTop: grid,
    backgroundColor: textColor,
  },
})

module.exports = YouTubeVideo
