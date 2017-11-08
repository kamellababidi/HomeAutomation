global.self = global;
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import { Icon} from 'react-native-elements'; 

const tts = require('react-native-android-speech')
export default class Controle extends React.Component {
        static navigationOptions={
            header:null,
        tabBarLabel:'Controle',
        tabBarIcon:({tintColor}) => (
        <Image source={require('./icon/control.png')}
         style={{width:24, height:24, tintColor:'white'}}>
        </Image>
       ) 
         
        
    }
        constructor(props) {
        super(props)
       this.state={
        init:this.getCureentUser(),
        wellcome:this.welcome(),
        name:"",
        turnon:"",
        connect:"",
        motion:"",
        text:"",
        temp:"",
        getTemp:this.temp(),
        autoDetect:this.autoDetect(),
        gasAutoDetect:this.gasAutoDetect()
       }
    }
    //motion auto detection
    autoDetect(){
        setInterval(async function(){
            try {

                 let response = await fetch('http://192.168.8.119:8000/motion');
                 let responseJson = await response.json();
                 if(responseJson=='y'){
                    Alert.alert("Warrning there is motion in your room")
                 }
           } catch(error) {
             console.error(error);
             }
        },2000);
    }
// Auto Gas Alarm 
gasAutoDetect(){
    setInterval(async function(){
        try {

             let response = await fetch('http://192.168.8.119:8000/gas');
             let responseJson = await response.json();
             if(responseJson=='g'){
                Alert.alert("Gas Danger")
                tts.speak({
                    text:'There is gas leaking in the kitchen, please do not play with electricity hurry up and close the gas buttle. In emergency cases call 911. ', 
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
             }
       } catch(error) {
         console.error(error);
         }
    },2000);
}
// Read the temperature
     temp() {
        var x=this
        setInterval(async function(){
            try {

                 let response = await fetch('http://192.168.8.119:8000/temp');

                 let responseJson = await response.json();

                   // Alert.alert(typeof(responseJson));

                  x.setState({temp:responseJson});
                 //var x=JSON.parse(responseJson)
                // this.state.temp=responseJson

               //  res=JSON.parse(res)

           } catch(error) {

             console.error(error);

             }

        },10000);
        

    } 




    async speak(){
    try{
        //More Locales will be available upon release.
        var spokenText = await SpeechAndroid.startSpeech("Speak now", SpeechAndroid.ENGLISH);
        //setTimeout(function(){ alert("kokokoko"); }, 3000);
        //ToastAndroid.show(spokenText , ToastAndroid.LONG);
        this.state.text=spokenText
        var a = this.state.text.search("turn");
        var b = this.state.text.search("on");
        var c = this.state.text.search("off");  
        if(a !==-1 && b!==-1){
            tts.speak({
                text:'your fan turned on', 
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
          this.turnon();
        }
        else if(a !==-1 && c!==-1){
            tts.speak({
                text:'your fan turned off', 
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
          this.turnoff();
        }else{
            tts.speak({
                text:'i can not understand', 
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
          Alert.alert("Try again!")
        }


    }catch(error){
        switch(error){
            case SpeechAndroid.E_VOICE_CANCELLED:
                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_NO_MATCH:
                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_SERVER_ERROR:
                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                break;
        }
    }
    }
    //detect motion 
    welcome() {
        tts.speak({
            text:'welcome to home automation system , how can i help you',
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
    }
    async motion() {
        try {
                 let response = await fetch('http://192.168.8.119:8000/motion');
                 let responseJson = await response.json();
                 //responseJson=JSON.parse(responseJson)
                 
                 if(responseJson=='n'){
                    Alert.alert("No motion in room")
                    tts.speak({
                        text:'No motion in your room', 
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
                 }else{
                    Alert.alert("there is motion in room");
                    tts.speak({
                        text:'there is motion in your room', 
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
                 }
                 this.setState({motion:responseJson})
               //  res=JSON.parse(res)
           } catch(error) {
             console.error(error);
             }
    } 

    //get current user
    async getCureentUser() {
        try {
                 let response = await fetch('https://home99.herokuapp.com/user');
                 let responseJson = await response.json();
                 this.setState({name:responseJson.name})
           } catch(error) {
             console.error(error);
             }
     } 
async connect(){
        try {
                 let response = await fetch('http://192.168.8.119:8000/connect');
                 let responseJson = await response.json();
                if(responseJson=="already connected"){
                   Alert.alert("you already connected")
                }else{
                   Alert.alert("Connected")
                }
                 // if(responseJson){
                 //     Alert.alert("Connected")
                 // }
               
           } catch(error) {
             console.error(error);
             }
   }
   async turnon(){
        try {
                 let response = await fetch('http://192.168.8.119:8000/on');
                 let responseJson = await response.json();
               
           } catch(error) {
             console.error(error);
             }
   }
   async turnoff(){
        try {
                 let response = await fetch('http://192.168.8.119:8000/off');
                 let responseJson = await response.json();
                
           } catch(error) {
             console.error(error);
             }
   }

    render() {
        return (
            <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('./Smart.png')} />

            </View>
                <Text style={styles.header}>
                    Welcome: {this.state.name}
                </Text>
                <Text style={styles.header}>
                the temperature now : {this.state.temp}  °C
                </Text>
           
             <TouchableHighlight
            style={styles.buttonContainer}
             onPress={() => this.connect()}>
             <Text style={styles.buttonText}>Connect</Text>
             </TouchableHighlight>                
               

             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.turnon()}>
             <Text style={styles.buttonText}>Turn on lights</Text>
             </TouchableOpacity> 
             
             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.turnoff()}>
             <Text style={styles.buttonText}>Turn off lights</Text>
               </TouchableOpacity> 
                
             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.motion()}>
             <Text style={styles.buttonText}>Detect motion in my room</Text>
             </TouchableOpacity> 
                
             <TouchableOpacity
             style={styles.buttonContainer}
             onPress={() => this.speak()}>
             <Text style={styles.buttonText}>Talk to your home</Text>
             </TouchableOpacity> 
            


            
        </View>
                

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'center'
    },
    
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 200,
        height: 200
    },
    header: {
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 10,
        fontWeight: '700',
        fontSize :20
    },

    buttonContainer: {
        backgroundColor: '#94336A',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#4F1335',
        height: 40,
        width: 200
    },
    buttonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '700'
    }
});