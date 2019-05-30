import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';
import axios from 'axios';


class Login extends React.Component{

  constructor(){
    super();
    this.state={
      email:'',
      password:''
    }
  }

  updateValue(text, field){
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
      //collection.name=this.state.name
      collection.email=this.state.email
      collection.password=this.state.password
      
      axios.post('http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/login/', collection)
      .then(function (response) {
          
        console.warn(response.status)
        if(response.data.token){
          if(res.status === 200){
            console.warn(this.props);
            this.props.navigation.navigate('Dashboard')
          }
        }
        console.warn(this.props);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
    render() {
      return(
        <View style={styles.container}>
          <View styles={styles.regform}>
            <Text style={styles.header}>Login</Text>

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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.submit()}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4ABDAC',
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
    btn:{
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#42A99A',
        marginTop: 30
      },
      btnText:{
        color: '#ECF0F1',
        fontWeight: 'bold'
      },

  });

  export default Login;