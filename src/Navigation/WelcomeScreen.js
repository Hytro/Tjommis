import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Logo from '../Assets/Logo.png';
import AsyncStorage from '@react-native-community/async-storage'

class WelcomeScreen extends React.Component{

    async componentDidMount() {
      const token = await AsyncStorage.getItem('token');
      if(token) {
        this.props.navigation.navigate('Dashboard')
      }
    }
    render() {
      return(
        <View style={styles.container}>

        <Image source={Logo} style={styles.image}/>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Signup')}>
             <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>
        </View>
      );
    }
  } 
  
  /*********************************Stylesheet Start*********************************/
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4ABDAC',
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
    image:{
      width: '80%',
      height: 150,
      resizeMode: 'cover'
    }
  });
  /*********************************Stylesheet End*********************************/

  export default WelcomeScreen;