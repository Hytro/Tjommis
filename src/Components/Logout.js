import React from 'react';
import {View, Text, TextInput, Image, Button, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../Assets/Logo.png';
import Icon from 'react-native-vector-icons/AntDesign';

class Logout extends React.Component{
    removeValue = async () => {
        try {
          await AsyncStorage.removeItem('token')
        } catch(e) {
          console.warn('Failed to remove token')
        }
      }

    goToWelcomeScreen(){
        this.props.navigation.navigate('Welcome')
    }

    logout(){
        this.removeValue()
        this.goToWelcomeScreen()
    }


    render() {
        return(
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('Welcome')}>
                <Icon
                  style={{ paddingLeft: 10 }}
                  onPress={() => navigation.openDrawer()}
                  name="left"
                  size={30}
                />
            </TouchableOpacity>
  
          <Image source={Logo} style={styles.image}/>
  
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.logout()}>
                <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
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
  export default Logout;