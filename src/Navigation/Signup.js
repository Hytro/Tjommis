import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


class Signup extends React.Component{

  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      firstName: '',
      lastName: ''
    }
  }

  /****************** UPDATE STATES START ******************/
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
    else if(field=='firstName') {
      this.setState({
        firstName: text
      })
    }
    else if(field=='lastName') {
      this.setState({
        lastName: text
      })
    }
  }
  /****************** UPDATE STATES END ******************/

  // Adding all state data to a collection
  submit(){
    let collection={}
      collection.email=this.state.email.toLowerCase()
      collection.password=this.state.password
      collection.firstName=this.state.firstName
      collection.lastName=this.state.lastName

      // Url to the database register
      var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/register/';
      
      // Fetches the url, then parses the data from the collection to the database
      // If this is successful, navigate the user to the dashboard, else display an error message
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        },  
      }).then((res) =>{res.json()
        if(res.status === 200){
          //console.warn(this.props);
          this.props.navigation.navigate('Dashboard')
        }
        console.warn(res.status)
      })
      .catch(error => console.error('Error:', error));
  }
  // Creates the registration layout, and parses the values given to the updateValue method
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
          <TextInput
            style={styles.textInput}
            placeholder="First name"
            underlineColorAndroid={'transparent'}
            onChangeText={(text)=>this.updateValue(text, 'firstName')}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last name"
            underlineColorAndroid={'transparent'}
            onChangeText={(text)=>this.updateValue(text, 'lastName')}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.submit()} >
            <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => this.goToWelcomeScreen()}>
              <Icon
                style={{ color: '#ECF0F1', paddingLeft: '30%'}}
                name="left"
                size={20}
              />
              <Text style={{color: '#ECF0F1', fontWeight: 'bold'}}>Tilbake</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

  /********************************* Stylesheet Start *********************************/
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
      width: 255,
      marginBottom: 30,
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1
    },
    btn:{
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#42A99A',
      marginTop: 30
    },
    btnText:{
      color: '#ECF0F1',
      fontWeight: 'bold'
    },
    backBtn: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#42A99A',
      marginTop: 20,
      flexDirection: 'row'
    }
  });
  /********************************* Stylesheet End *********************************/

  export default Signup;