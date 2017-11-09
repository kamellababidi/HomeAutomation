
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
const ImagePicker = require('react-native-image-picker');
import prompt from 'react-native-prompt-android';
export default class Profile extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./icon/pro.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
            />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            init: this.getCureentUser(),
            name: '',
            logout: '',
            image: 'a'
        };
    }
    //set new name in database
    async SetName() {
        try {
            let response = await fetch('http://192.168.8.106:8000/SetName', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        name: this.state.name
                    }
                })
            });

            let res = await response.text();
        } catch (errors) {
            console.log('catch errors' + errors);
        }
    }
    //change username
    ChangeName() {
        prompt(
            'Enter your username',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: name => {
                        this.setState({
                            name: name
                        });
                        this.SetName();
                    }
                }
            ],
            {
                type: 'secure-text',
                cancelable: false,
                placeholder: 'UserName'
            }
        );
    }
    //update the new image
    async SetNewImage() {
        try {
            let response = await fetch(
                'http://192.168.8.106:8000/SetNewImage',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: {
                            image: this.state.image,
                            name: this.state.name
                        }
                    })
                }
            );

            let res = await response.text();
        } catch (errors) {
            console.log('catch errors' + errors);
        }
    }
    //logout
    async logout() {
        try {
            let response = await fetch('http://192.168.8.106:8000/logout');
            let responseJson = await response.json();
            this.setState({ logout: responseJson });
            this.props.screenProps.changeV('Login');
        } catch (error) {
            console.error(error);
        }
    }

    //fetch user info
    async getCureentUser() {
        try {
            let response = await fetch('http://192.168.8.106:8000/user');
            let responseJson = await response.json();
            this.setState({ image: responseJson.image });
            this.setState({ name: responseJson.name });
        } catch (error) {
            console.error(error);
        }
    }
    ChangePicture() {
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
                //update the image in database
                this.SetNewImage();
            }
        });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: this.state.image }}
                    />
                </View>

                <Text style={styles.header}>{this.state.name}</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.ChangeName()}
                >
                    <Text style={styles.buttonText}>Change username</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.ChangePicture()}
                >
                    <Text style={styles.buttonText}>
                        Change profile picture
                    </Text>
                </TouchableOpacity>

                <TouchableHighlight
                    style={styles.buttonContainer}
                    onPress={() => this.logout()}
                >
                    <Text style={styles.buttonText}>Log out</Text>
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
        marginBottom: 40,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: '700',
        fontSize: 30
    },
    buttonContainer: {
        backgroundColor: '#94336A',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4F1335',
        height: 40,
        width: 200
    },
    buttonText: {
        marginTop: -5,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#94336A'
    }
});
