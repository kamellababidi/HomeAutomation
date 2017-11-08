global.self = global;
import React from 'react';
<<<<<<< HEAD
import { StyleSheet, View, Dimensions,Image ,Alert } from 'react-native';
=======
import { StyleSheet, View,Image, Dimensions } from 'react-native';
>>>>>>> origin
import MapView from 'react-native-maps';
import { Icon} from 'react-native-elements'; 
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_PATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_PATIO;
var rad = function(x) {
  return x * Math.PI / 180;
};
const tts = require('react-native-android-speech')
var getDistance = function(p1, rbk) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(rbk.lat - p1.latitude);
  var dLong = rad(rbk.lng - p1.longitude);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) * Math.cos(rad(rbk.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};
 
export default class Map extends React.Component {
    static navigationOptions = {
        header: null,     
        tabBarLabel: 'Map',
        tabBarIcon:({tintColor}) => (
        <Image source={require('./icon/mapn.png')}
         style={{width:24, height:24, tintColor:'white'}}>
        </Image>
       ) 
    };
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
            dist:""
        };
    }
    watchID: ?number = null;
    notify(){
        tts.speak({
                text:'you are around '+this.state.dist+',do you want to open garag door?', 
                pitch:1.5, 
                forceStop : false , 
                language : 'en', 
                country : 'US' 
            }).then(isSpeaking=>{
    //Success Callback
                 console.log(isSpeaking);
            }).catch(error=>{
    //Errror Callback
                 console.log(error)
            });
        Alert.alert(
  'Warning',
  'you are around '+this.state.dist+',do you want to open garag door?',
  [
    {text: 'Ask me later', onPress: () => Alert.alert('Ask me later pressed')},
    {text: 'Cancel', onPress: () => Alert.alert('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => this.sendaction()},
  ],
  { cancelable: false }
)
    }
    async sendaction(){
        //turn on the light
        try {
                 let response = await fetch('http://192.168.8.106:8000/onL');
                 let responseJson = await response.json();

               
           } catch(error) {
             console.error(error);
             }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);
                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGTITUDE_DELTA
                };
                this.setState({ initialPosition: initialRegion });
                this.setState({ markerPosition: initialRegion });
                
            
    
            
            },
            error => console.log(JSON.stringify(new Date(), error)),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 }
        );
        this.watchID = navigator.geolocation.watchPosition(position => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            var lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            };
            this.setState({ initialPosition: lastRegion });
            this.setState({ markerPosition: lastRegion });
            
        });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
<<<<<<< HEAD
                    onPress={()=> {
                        var rbk={lat:"31.9865875",lng:"35.8377417"};
                        var desta= getDistance(this.state.initialPosition,rbk);
            this.state.dist=(desta/100).toString();
                        Alert.alert(this.state.dist)
                        if(desta/100<1){
                            this.notify()
            }
                    }}
                    // onPress={(m) => this.setState({ x: m.nativeEvent.coordinate.latitude ,y: m.nativeEvent.coordinate.longitude }) Alert.alert(x,y)}
                    region={this.state.initialPosition}
=======
                    //  onPress={(m) => this.setState({
                    //   x: m.nativeEvent.coordinate.latitude ,
                    //   y: m.nativeEvent.coordinate.longitude }) Alert.alert(x,y)}
                    // region={this.state.initialPosition}
>>>>>>> origin
                >
                    <MapView.Marker coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker} />
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 112, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        borderColor: 'white',
        borderWidth: 3,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    }
});
