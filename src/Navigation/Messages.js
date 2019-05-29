import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Messages extends React.Component{
    render() {
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>Messages</Text>
        </View>
      );
    }
  }
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });

  export default Messages;
