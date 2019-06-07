import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios'
import { YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GiftedChat } from 'react-native-gifted-chat'


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
    const messages = msgResponse.data.map(msg => {
      return {
        _id: msg.id,
        createdAt: msg.sent_at,
        text: msg.message,
        user: {
          _id: msg.sender_id,
          name: users[msg.sender_id].firstName
        }
      }
    }).reverse();
    this.setState({users: users, messages})
    this.socket = io('http://tjommis.eu-central-1.elasticbeanstalk.com/');
    this.socket.emit('join', eventId)
    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt,
          user: {
            _id: data.sender_id,
            name: users[data.sender_id].firstName
          }
        });
    });
    console.log("WE HERE")
    const addMessage = data => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, data)
        }))
    };
    console.log("USERS IN EVENT:", usersResponse.data)
    console.log("Messages in event",messages)
    this.render();
  }
  onMessageChange = (text) => {
    console.log(text)
    this.setState({message: text})
  }
  sendMessage = (messages) => {
    this.socket.emit('SEND_MESSAGE', {
        sender_id: this.state.userId,
        message: messages[0].text,
        eventId: this.state.eventId
    });
  }

    render = () => {
      console.log("Rendered")
      return(
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.sendMessage(messages)}
          placeholder="Your message.."
          user={{
            _id: this.state.userId,
          }}
        />
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
