import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';


class Login extends React.Component{

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
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  export default Login;
    
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