import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Image

    
} from 'react-native';

export default class ChatBox extends React.Component {
       static navigationOptions={
        tabBarLabel:'ChatBox'
    }
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
                <Text style={styles.header}>
                    {' '}
                    Welcome to chatBox
                </Text>

            
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
