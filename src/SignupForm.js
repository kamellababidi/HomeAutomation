import React from 'react';
import { StyleSheet, Text, View , TextInput , TouchableOpacity} from 'react-native';


export default class SignupForm extends React.Component {
	constructor(){
		super()	
		this.state = {
			username : "",
			password : "",
      image: ""

		}
	}

  async onSubmit(){
  	try{ 
  		let response = await fetch('192.168.8.115/signup',{
  		method:'POST',
  		headers:{
  			'Accept': 'application/json',
  			'Content-Type':'application/json'
  		},
  		body: JSON.stringify({
  			user:{
  				username:this.state.username,
  				passwors:this.state.password,
          email:this.state.email
  			}
  		})
  });

  	 let res = await response.text();

  }catch(errors){
  	console.log('catch errors'+ errors)
  }
}
  render() {
    return (
      <View style={styles.container}>
      	<TextInput
      	placeholder="username"
      	returnKeyType ="next"
      	onChangeText = {(value) => this.setState({username:value})}
      	placeholderTextColor='#FFB6C1'
      	style={styles.input}
      		/>
      		
      		   
      	 
      	<TextInput
      	placeholder="password"
      	secureTextEntry={true}
      	returnKeyType ="next"
      	onChangeText = {(value) => this.setState({password:value})}
      	placeholderTextColor='#FFB6C1'
      	style={styles.input}
      		/> 

          <TextInput
        placeholder="email"
        returnKeyType ="go"
        onChangeText = {(value) => this.setState({email:value})}
        placeholderTextColor='#FFB6C1'
        style={styles.input}
          /> 
      		
   		<TouchableOpacity style={styles.buttonContainer} onPress={this.onSubmit.bind(this)}>
   			<Text style={styles.buttonText}>Signup</Text>
   		</TouchableOpacity>
      </View>
    );
  }  
}
const styles = StyleSheet.create({
container : {
	padding :20
},
input : {
	height: 40,
  width :200, 
	marginBottom :20,
	paddingHorizontal : 10 , 
	backgroundColor: '#E0FFFF',
	color :'#C71585',
	paddingHorizontal : 10,
  textAlign :'center'


},
buttonContainer : {
	backgroundColor : '#C71585',
	paddingVertical : 15

},
buttonText : {
	textAlign :'center',
	color :'#000000',
	fontWeight: '700'
}
});