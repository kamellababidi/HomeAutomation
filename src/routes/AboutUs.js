
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
    Alert,
    Linking,
    KeyboardAvoidingView
} from 'react-native';
export default class AboutUs extends React.Component {
    constructor(props) {
        super(props);
       
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

                <View style={styles.contaContainer}>
                 <Text style={styles.header}>
                 Done By Smart Home Team √
                 {'\n'}
                 Kamel :  App owner √
                 {'\n'}

                 Abeer :  Scrum master √
                 {'\n'}

                 Tareq :  Scrum master backup √
                 {'\n'}

                 Maram :  Team member √
                 {'\n'}
                 If you have any question you can contact us on :

                 </Text>
                
                    <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('https://github.com/SmartHome-RBK')}>
                            Github
                            {'\n'}
                    </Text>

                    <Text style={{color:'white' , size:18}}>
                        
                        {'\n'}
                        email: kamelallababidi@gmail.com
                        {'\n'}
                        Phone :00962-779170425

                     </Text>
                    
                </View>

                <View>
               
                        <TouchableHighlight  
                        style={styles.buttonContainer}                       
                            onPress={() => this.props.changeV('Signup')}
                        >
                            <Text style={styles.buttonText}> ← Go back to Signup</Text>
                        </TouchableHighlight>
                    
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        padding: 60,
        justifyContent: 'center'
    },

    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: 30,
        marginBottom: 35
    },

    logo: {
        width: 200,
        height: 200
    },
    header: {
        color: '#94336A',
        marginTop: 80,
        marginBottom: 30,
        textAlign: 'center',
        opacity: 0.6,
        fontWeight: '700',
        fontSize: 18,
        fontFamily : 'fantasy'
    },

    buttonContainer: {
        paddingVertical: 15,
        marginBottom: 100,
        height: 40,
        width: 140
    },
    buttonText: {
        marginTop: -5,
        textAlign: 'center',
        color: 'blue',
        fontWeight: '700'
    },
        contaContainer :{
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: 20,
        marginBottom: 35

    }
});
