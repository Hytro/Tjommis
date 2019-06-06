import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class Messages extends React.Component {
  state = {
    events: []
  }
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    const eventsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`)
    this.setState({ events: eventsResponse.data })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.events.map((event, i) => {
          return (<View key={i} style={styles.chat}>
            <View style={styles.avatar} />
            <Text>{event.title}</Text>
          </View>)
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',

  },
  chat: {
    height: 90,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 10
  },
  avatar: {
    borderRadius: 30,
    height: 50,
    width: 50,
    backgroundColor: 'rgb(74, 189, 172)'
  }
});

export default Messages;
