
const {
  Dimensions,
  WebView,
} = React

class SoundCloud extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <WebView
        style={styles.container}
        url={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/2976616&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    )
  }
}

// default style
const
  styles = StyleSheet.create({
  container: {
    padding: grid,
    marginTop: grid,
    marginBottom: grid * 2,
    flex: 1,
    backgroundColor: '#000',
    height: 425,
  },
})

module.exports = SoundCloud
