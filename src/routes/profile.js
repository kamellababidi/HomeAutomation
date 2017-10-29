import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Image

    
} from 'react-native';

export default class Profile extends React.Component {
       static navigationOptions={
        tabBarLabel:'Profile'
    }
    constructor(props) {
        super(props);
        this.state={
            init:this.getCureentUser(),
            image:"https://i.ytimg.com/vi/kRZsOgniUMI/hqdefault.jpg"
        }

    }

    async getCureentUser() {
        try {
                 let response = await fetch('http://192.168.1.17:8080/user');
                 let responseJson = await response.json();
                 this.setState({image:responseJson.image})
           } catch(error) {
             console.error(error);
             }
    } 

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('./Smart.png')}
                    />
                    </View>

               
                <Text style={styles.header}>
                    
                    setting hereeee but not ready yet
                </Text>
                <View>
                <Image source={{uri: this.state.image}} style={{width: 60, height: 60}} />
                </View>
                </KeyboardAvoidingView>

            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
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
        fontWeight: '700'
    }
});
