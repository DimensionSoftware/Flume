'use strict';

const {
  ListView,
  Dimensions,
  Text,
  Image,
  Animated,
  TextInput,
  View,
  TouchableHighlight,
  Navigator,
} = React

const LinearGradient = require('react-native-linear-gradient');

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
      <Animated.View style={{ backgroundColor: 'transparent', opacity: this.state.fadeInFlower, }}>
          <LinearGradient colors={['rgb(175,149,197)', 'rgb(209,109,132)']} style={styles.gradient}>
            <Image source={require('./assets/flower.png')} resizeMode={Image.resizeMode.contain} style={styles.flower}>
            </Image>
          </LinearGradient>
      </Animated.View>
    )
  }
}

const window = Dimensions.get('window')
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    opacity: 1,
  },
  flower: {
    flex: 1,
    //backgroundColor: 'rgb(209,109,132)',
    backgroundColor: 'transparent',
  },
})

module.exports = IntroScene
