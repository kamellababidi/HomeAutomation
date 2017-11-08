global.self = global;
import React from 'react';

import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';

import SocketIOClient from 'socket.io-client';
// import SocketIOClient from 'https://code.jquery.com/jquery-1.11.1.js'
import { Icon} from 'react-native-elements'; 


export default class ChatBox extends React.Component {

  static navigationOptions={
    header: null,    
    tabBarLabel:'ChatBox',
    tabBarIcon:({tintColor}) => (
      <Image 
        source={require('./icon/cha.png')}
        style={{width:24, height:24, tintColor:'white'}}
      >
      </Image>
    ) 
  }

  constructor(props){
    super(props)

    this.state={
      init:this.getCureentUser(),
        arr:[{user:'user', text:'please enter your message', date:'new Date'}], // initial values
        image:'',
        name:'',
        msg:''
      }

    this.socket = SocketIOClient('https://home99.herokuapp.com/');

    //fetch previous messages from the database
    this.socket.on('allDataBase',(data)=> {
      this.showArr(data);
    })

    //listen for mew messages
    this.socket.on('msg', (data)=> {
      this.showArr(data);
    })
  }

 //fetch user info
  async getCureentUser() {
    try {
      let response = await fetch('https://home99.herokuapp.com/user');
      let responseJson = await response.json();
      this.setState({image:responseJson.image})
      this.setState({name:responseJson.name})
    } 
    catch(error) {
      console.error(error);
    }
  } 

  // replace old array of messages with the newest one which includes new messages
  showArr(data){
    data = data.reverse();
    this.setState((pre)=> {
      return {
        arr:data
      }
    })
  }

  // save the text inside the Text Input in var msg
  changeMsg(data){
    this.setState({
      msg: data
    })
  }

  // send new message 
  send(data){
    this.socket.emit('message', {user: this.state.name, text: data, date:(new Date).toString()})
    this.setState({msg:''})
  }

  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>        
        <View>

          <TextInput
            placeholder = "Type here ..."
            onChangeText =  {(text) => this.changeMsg(text)}
            value = {this.state.msg}
          />

          <TouchableOpacity
            onPress={()=>{this.send(this.state.msg)}}
          >
            <Text>Send</Text>
          </TouchableOpacity>

          <FlatList
            data={this.state.arr}
            renderItem={({item}) =>
              <View>
                <Text style={styles.item}>
                  {item.user + ': '+item.text}
                </Text>
                <Text style={styles.items}> {item.date}</Text>
              </View>
            }
          />

        </View>  
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgb(135, 206, 250)',
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  items: {
    alignSelf:'flex-end',
    fontSize: 12,
  },
});