
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    Alert,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
const ImagePicker = require('react-native-image-picker');
export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            image: ''
        };
    }
    pick() {
        var options = {
            title: 'Select profile image',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' }
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
            } else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    image: source.uri
                });
            }
        });
    }
    async Signup() {
        try {
            let response = await fetch('http://192.168.8.106:8000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        image: this.state.image
                    }
                })
            });
            let res = await response.text();
            console.log(res);
            res = JSON.parse(res);
            if (res == 'exist') {
                Alert.alert('this user is already exist');
            } else {
                Alert.alert('Done ,, Now you can go to Login');
                return this.props.changeV('Login');
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
                        autoCapitalize="none"
                        returnKeyType="next"
                        onChangeText={value =>
                            this.setState({ username: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="password"
                        secureTextEntry={true}
                        returnKeyType="next"
                        onChangeText={value =>
                            this.setState({ password: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="email"
                        returnKeyType="go"
                        keyboardType="email-address"
                        validators="required"
                        onChangeText={value => this.setState({ email: value })}
                        placeholderTextColor="#800080"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.pick()}
                    >
                        <Text style={styles.buttonText}>Pick image</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        backgroundColor: '#87CEFA'
                    }}
                >
                    <TouchableHighlight
                        style={styles.buttonRow}
                        onPress={() => this.Signup()}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.buttonRow}
                        onPress={() => this.props.changeV('Login')}
                    >
                        <Text style={styles.buttonText}>Go back to Login</Text>
                    </TouchableHighlight>
                </View>

                 <TouchableHighlight
                   
                        onPress={() => this.props.changeV('AboutUs')}
                    >
                        <Text style={{color:'blue'}}>About Us → </Text>
                    </TouchableHighlight>
            </KeyboardAvoidingView>
        );
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
        marginBottom: 30,
        fontWeight: '700',
        fontSize: 20
    },
    input: {
        height: 40,
        width: 200,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#E0FFFF',
        color: '#94336A',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: '#94336A',
        paddingVertical: 15,
        marginBottom: 20,
        height: 40,
        width: 200
    },
    buttonText: {
        marginTop: -5,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    buttonRow: {
        backgroundColor: '#4F1335',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#94336A',
        height: 40,
        width: 140
    }
});
