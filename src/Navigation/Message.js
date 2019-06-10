import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { GiftedChat } from 'react-native-gifted-chat'
import IconFA from 'react-native-vector-icons/FontAwesome'

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
    this.setState({eventId: eventId, userId: parseInt((await AsyncStorage.getItem('userId')), 10)}, () => {
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
    this.render();
  }
  onMessageChange = (text) => {
    console.log(text)
    this.setState({message: text})
  }
  sendMessage = (messages) => {
    messages.forEach(message => {
      this.socket.emit('SEND_MESSAGE', {
        sender_id: this.state.userId,
        message: message.text,
        eventId: this.state.eventId
    });
    })
  }

    render = () => {
      console.log(this.state.messages)
      return(
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.eventTop}>
            <TouchableOpacity 
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('NewSubEvent',  {eventId: this.state.eventId})}>
              <View 
                style={styles.flexRowHalf}>
                  <IconFA
                      name="map-marker"
                      size={18}
                      color="white"
                  />
                  <Text numberOfLines={1} style={styles.btnText}>Opprett Underevent</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('MySubEvent', { eventId: this.state.eventId })}>
              <View style={styles.flexRowHalf}>
                  <IconFA
                      name="calendar"
                      size={18}
                      color="white"
                  />
                  <Text numberOfLines={1} style={styles.btnText}>Underevent Liste</Text>
              </View>
            </TouchableOpacity>
          </View>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.sendMessage(messages)}
            placeholder="Skriv melding.."
            user={{
              _id: this.state.userId,
            }}
          />
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
    },
    eventTop: {
      flexDirection: 'row', 
      backgroundColor: '#ecf0f1'
    },
    flexRowHalf: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    btn:{
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: '#4ABDAC',
      borderColor: '#4ABDAC',
      borderWidth: 1,
      borderRadius: 4,
      margin: 4,
      width:'45%',
      marginLeft: '3%',
      height: 50
    },
    btnText:{
      color: 'white',
      alignSelf: 'flex-start',
      fontSize: 12
    },
  });

  export default Messages;
