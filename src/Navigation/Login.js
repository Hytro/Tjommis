import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    }
  }

  // sends the user to the welcomescreen
  goToWelcomeScreen() {
    this.props.navigation.navigate('Welcome')
  }
  // sets the input value for passwords and mail 
  updateValue(text, field) {
    this.setState({ errorMsg: '' })
    if (field == 'email') {
      this.setState({
        email: text,
      })
    }
    else if (field == 'password') {
      this.setState({
        password: text,
      })
    }
  }

  storeData = async (token) => {
    try {
      console.log("STORED TOKEN", token)
    } catch (e) {

    }
  }

  // fetches the correct user data from the database
  async submit() {
    let collection = {}
    collection.email = this.state.email.toLowerCase()
    collection.password = this.state.password
    this.setState({ errorMsg: '' })

    var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/login/';
    try {
      const response = await axios.post(url, collection);
      if (response.status === 200) {
        //console.warn(response.data.token);
        await AsyncStorage.setItem('token', response.data.token)
        this.props.navigation.navigate('Dashboard');
        console.log("TOKEN FROM RESPONSE", response.data.token)
        
      }
      console.log(response.status)
      if (response.status === 401 || response.status === 400) {
        console.log('UNAOTHORIZED')
        this.setState({ errorMsg: 'Incorrect username or password.' })
      }
    } catch (e) {
      console.log('Unaothirzed')
      this.setState({ errorMsg: 'Error while logging in.' })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View styles={styles.regform}>
          <Text style={styles.header}>Login</Text>
          {this.state.errorMsg !== '' ?
            <View style={styles.error}><Text styles={styles.error}>{this.state.errorMsg}</Text></View>
            : null}
          <TextInput
            style={styles.textInput}
            placeholder="Your email"
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.updateValue(text, 'email')}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Your password"
            secureTextEntry={true}
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.updateValue(text, 'password')}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.submit()}>
            <Text style={styles.btnText}>Login</Text>
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
  regform: {
    alignSelf: 'stretch'
  },
  header: {
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
  error: {
    backgroundColor: '#c0392b',
    color: '#fff',
    padding: 10
  },
  btn: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#42A99A',
    marginTop: 30
  },
  btnText: {
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

export default Login;

