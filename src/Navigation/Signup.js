import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

class Signup extends React.Component{
    render() {
      return(
        <View style={styles.container}>
          <Button 
            title='Signup' 
            onPress={()=>this.props.navigation.navigate('EventDetail')}
          />
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
      backgroundColor: '#F5FCFF',
    }
  });