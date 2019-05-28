import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class MyEvents extends React.Component{
    render() {
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>MyEvents</Text>
        </View>
      );
    }
  }

  export default MyEvents;
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });
