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
    message: '',
    isSub: false
  }
  // If the page is rendered correctly, get the event id and set the user id state
  async componentDidMount() {
    const eventId = this.props.navigation.getParam('eventId', 'NO-ID')
    console.log("EVENT ID", eventId)
    const isSub = ('' + eventId).includes('sub');
    console.log(isSub)
    this.setState({eventId: eventId, isSub, userId: parseInt((await AsyncStorage.getItem('userId')), 10)}, () => {
      console.log("UID", this.state.userId)
    })
    // Get the reponse from the other users from the event id and the users connected to that event id
    const usersResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/${isSub ? 'subs' : 'events'}/${isSub ? eventId.substring(3) : eventId}/users`);
    // Get the response from the current user from the event id and the users message
    const msgResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/${isSub ? 'subs' : 'events'}/${isSub ? eventId.substring(3) : eventId}/messages`);
    const users = {};
    usersResponse.data.forEach(user => users[user.id] = user)
    // Maps the message response and return it with both an image, the message and the id/name of the sender
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
    }).reverse(); // Reverse the chat, we want the last message at the bottom, not the top
    // Updates the state, and adds the users and messages to the users array
    this.setState({users: users, messages})
    this.socket = io('http://tjommis.eu-central-1.elasticbeanstalk.com/');
    this.socket.emit('join', eventId)
    // Uses the socket to receive a message with the added data
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
    // Updates the state, by setting the previous state and adding the new message to that state
    const addMessage = data => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, data)
        }))
    };
    console.log("USERS IN EVENT:", usersResponse.data)
    // Renders the page to display the new message
    this.render();
  }
  // Set the message state with the new message
  onMessageChange = (text) => {
    console.log(text)
    this.setState({message: text})
  }
  // Sends a message with a socket, containing the sender id, message and the event id
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
      // Creates two buttons at the top of the page, one to add a new sub event, and one to view
      // already created sub events
      // Uses the GiftedChat library to display the chat with the given messages
      return(
        <View style={{flex: 1, flexDirection: 'column'}}>
        {!this.state.isSub ?
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
        : null}
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
    
  /********************************* Stylesheet Start *********************************/
  const styles = StyleSheet.create({
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
      margin: 8,
      width:'45%',
      marginLeft: '2.5%',
      height: 50
    },
    btnText:{
      color: 'white',
      alignSelf: 'flex-start',
      fontSize: 12
    },
  });
  /********************************* Stylesheet End *********************************/

  export default Messages;
