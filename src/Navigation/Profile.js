import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Profile extends React.Component{
    render() {
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>Profile</Text>
        </View>
      );
    }
  }

  export default Profile;
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });
