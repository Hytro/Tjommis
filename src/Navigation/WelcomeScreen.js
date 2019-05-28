import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

class WelcomeScreen extends React.Component{
    render() {
      return(
        <View style={styles.container}>
          <Button 
          title='Login' 
          onPress={() => this.props.navigation.navigate('Dashboard')} 
          />
          <Button 
          title='Sign Up' 
          onPress={() => this.props.navigation.navigate('Signup')}
          />
        </View>
      );
    }
  } 

  export default WelcomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });