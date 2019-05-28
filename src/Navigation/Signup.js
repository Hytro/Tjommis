import React from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';


class Signup extends React.Component{

  constructor(){
    super();
    this.state={
      //name:'',
      email:'',
      password:''
    }
  }

  updateValue(text, field){
    
//    if(field=='name'){
//      this.setState({
//        name:text,
//      })
//    }
    if(field=='email'){
      this.setState({
        email:text,
      })
    }
    else if(field=='password'){
      this.setState({
        password:text,
      })
    }
  }

  submit(){
    let collection={}
//      collection.name=this.state.name
      collection.email=this.state.email
      collection.password=this.state.password
      console.warn(collection);


      var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/register/';
      
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }

    render() {
      return(
        <View style={styles.container}>
          <View styles={styles.regform}>
            <Text style={styles.header}>Registration</Text>

            <TextInput 
              style={styles.textInput} 
              placeholder="Your email" 
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'email')}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Your password" 
              secureTextEntry={true}
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'password')}
            />
            <Button 
              title='Signup' 
              onPress={() => this.submit()} 
            />
          </View>
        </View>
      );
    }
  }

  export default Signup;
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#34485f',
      paddingLeft: 60,
      paddingRight: 60
    },
    regform:{
      alignSelf: 'stretch'
    },
    header:{
      fontSize: 24,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
    },
    textInput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1
    },

  });