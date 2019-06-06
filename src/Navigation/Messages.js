import React from 'react';
import {View, FlatList, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Messages extends React.Component{
    state = {
      events: []
    }
    async componentDidMount() {
      const userId = await AsyncStorage.getItem('userId');
      const eventsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`)
      this.setState({events: eventsResponse.data})
    }
    goToMessageRoom(id) {
      this.props.navigation.navigate('Message', {eventId: id})
    }

    render() {
      return(
        <FlatList 
        style={styles.container}
        data={this.state.events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item}) => <TouchableOpacity onPress={() => this.goToMessageRoom(item.id)}><View style={styles.chat}><View style={styles.avatar}/><Text>{ item.title }</Text></View></TouchableOpacity>}
        />
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
      backgroundColor: '#8e44ad'
    }
  });

  export default Messages;
