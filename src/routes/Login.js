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
    Alert,
    KeyboardAvoidingView
} from 'react-native';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    async Login() {
        try {
            let response = await fetch('https://home99.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: this.state.username,
                        password: this.state.password
                    }
                })
            });

            let res = await response.text();
            console.log(res);
            res = JSON.parse(res);
            if (res == 'done') {
                return this.props.changeV('Home');
                console.log('exist');
            } else {
                Alert.alert('username or password incorrect');
            }
        } catch (errors) {
            console.log('catch errors' + errors);
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
                    Welcome to the Home Automation System
                </Text>

                <View>
                    <TextInput
                        placeholder="username"
                        returnKeyType="next"
                        validators="required"
                        onSubmitEditing={()=> this.passwordInput.focus()}
                        onChangeText={value =>
                        this.setState({ username: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        validators="required"
                        returnKeyType="go"
                        ref={(Input)=> this.passwordInput = Input}
                        onChangeText={value =>
                        this.setState({ password: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />
                    <View style={{flex: 0, flexDirection: 'row',backgroundColor: '#87CEFA'}}>
                    <TouchableHighlight
                        style={styles.buttonRow}
                        onPress={() => this.Login()}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.buttonRow}
                        onPress={() => this.props.changeV('Signup')}
                    >
                        <Text style={styles.buttonText}>Go to Signup</Text>
                    </TouchableHighlight>

                    </View>
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
        paddingBottom : 30,
        marginBottom: 35
    },

    logo: {
        width: 200,
        height: 200
    },
    header: {
        color: '#fff',
        marginBottom:0,
        marginTop: 5,
        marginBottom: 30,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: '700',
        fontSize :20
    },
    input: {
        marginBottom: 20,   
        paddingHorizontal: 10,
        backgroundColor: '#E0FFFF',
        marginLeft: 85,
        textAlign: 'center',
        justifyContent: 'center',
        color: '#94336A',  
        height: 40,      
        width: 200
        
    },
    buttonContainer: {
        backgroundColor: '#94336A',
        paddingVertical: 15
    },
    buttonText: {
        marginTop: -5,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
        buttonRow :{    
        backgroundColor: '#4F1335',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 100,
        marginLeft: 40,
        marginRight: 5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#94336A',
        height: 40,
        width: 140
    }
});
