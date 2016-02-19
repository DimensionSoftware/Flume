
const {
  Dimensions,
  AsyncStorage,
  Easing,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  LinkingIOS,
} = React,
  LinearGradient = require('react-native-linear-gradient'),
  color          = require('color')

class TourDates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tourEvents: []
    }
  }

  componentWillMount() { // XXX this janks a bit
    this.getInitialStateAsync().done()

    // fetch latest from songkick api
    fetch('http://api.songkick.com/api/3.0/artists/3645486/calendar.json?apikey=yNWW8T6ehHnjZwL4', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res)  => res.json())
      .then((data) => {
      if (data.resultsPage.status === 'ok') {
        this.set('tourEvents', JSON.stringify(data.resultsPage.results.event)) // stash
        this.setState({tourEvents: data.resultsPage.results.event})
      }
    })
  }

  async getInitialStateAsync() {
    const // from async storage
      tourEvents = await AsyncStorage.getItem('tourEvents')
    this.setState({tourEvents: JSON.parse(tourEvents) || []})
  }

  set(key, value) {
    AsyncStorage.setItem(key, value)
  }

  render() {
    return (
      <LinearGradient colors={[color(themeColor).clearer(.4).rgbaString(), color(themeColor).clearer(.9).rgbaString()]} style={styles.container}>
        <Text style={styles.header}>TOUR</Text>
        {this.state.tourEvents.map((tour, i) => {
          return (i < 10) // latest N shows
            ? <View key={i} style={styles.tour}>
                <Text style={styles.date}>{tour.start.date}</Text>
                <Text style={styles.name}>{tour.displayName}</Text>
                <Text style={styles.city}>{tour.location.city}</Text>
                <TouchableHighlight underlayColor='transparent' onPress={() => {
                    LinkingIOS.openURL('http://www.songkick.com/artists/3645486')
                  }}>
                  <Text style={styles.tickets}>TICKETS</Text>
                </TouchableHighlight>
              </View>
            : <View key={i}></View>
        })}
      </LinearGradient>
    )
  }
}

// default style
const window = Dimensions.get('window'),
  height     = window.height,
  styles     = StyleSheet.create({
  container: {
    padding: grid,
    marginTop: grid * 2.5,
    marginBottom: grid * 1.5,
    flex: 1,
  },
  tour: {
    flex: 1,
    marginBottom: grid,
    paddingBottom: grid,
    borderBottomWidth: 1,
    borderBottomColor: color(darkThemeColor).clearer(.8).rgbaString()
  },
  header: {
    flex: 1,
    fontFamily,
    marginBottom: grid,
    letterSpacing: 3,
    fontSize: 50,
    color: textColor,
    alignSelf: 'center',
    fontWeight: '300',
  },
  tickets: {
    backgroundColor: color(darkThemeColor).clearer(.7).rgbaString(),
    position: 'absolute',
    padding: grid,
    paddingVertical: grid / 2.5,
    bottom: -grid / 2,
    right: 0,
    color: textColor,
    fontSize: 10,
    fontFamily,
  },
  name: {
    flex: 1,
    fontFamily,
    color: textColor,
    fontSize: 18,
  },
  city: {
    fontFamily,
    color: color(textColor).darken(.15).rgbString(),
    fontSize: 14,
  },
  date: {
    fontFamily,
    color: textColor,
    fontWeight: 'bold',
    fontSize: 15,
  },
})

module.exports = TourDates
