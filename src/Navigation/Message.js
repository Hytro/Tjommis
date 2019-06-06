import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios'
import { YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class Messages extends React.Component{
  state = {
    users: [],
    messages: [],
    eventId: 6,
    userId: false,
    message: ''
  }
  async componentDidMount() {
    const eventId = this.props.navigation.getParam('eventId', 'NO-ID')
    console.log("EVENT ID", eventId)
    this.setState({eventId: eventId, userId: await AsyncStorage.getItem('userId')}, () => {
      console.log("UID", this.state.userId)
    })
    const usersResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${eventId}/users`);
    const msgResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${eventId}/messages`);
    const users = {};
    usersResponse.data.forEach(user => users[user.id] = user)
    console.log(users)
    this.setState({users: users, messages: msgResponse.data})
    this.socket = io('http://tjommis.eu-central-1.elasticbeanstalk.com/');
    this.socket.emit('join', eventId)
    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });
    console.log("WE HERE")
    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
    };
    console.log("USERS IN EVENT:", usersResponse.data)
    console.log("Messages in event",msgResponse.data)
  }
  onMessageChange = (text) => {
    console.log(text)
    this.setState({message: text})
  }
  sendMessage = () => {
    this.socket.emit('SEND_MESSAGE', {
        sender_id: this.state.userId,
        message: this.state.message,
        eventId: this.state.eventId
    });
    this.setState({message: ''});
  }

    render() {
      return(
        <View style={styles.container}>
        {Object.keys(this.state.users).length > 0 ? this.state.messages.map((message, i) => {
          return (<View key={i} style={styles.message}>
            <Text>{this.state.users[message.sender_id].firstName}-{message.message}</Text>
          </View>)
        }): null}
        <View>
          <TextInput value={this.state.message} onChangeText={(text) => this.onMessageChange(text)} placeholder="test"/>
          <Button onPress={this.sendMessage} title={'This'}></Button>
        </View>
        </View>
      );
    }
  }
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FF1111',
    },
    message: {
      height: 30,
      width: '100%',
      backgroundColor: '#11ff11'
    }
  });

  export default Messages;
