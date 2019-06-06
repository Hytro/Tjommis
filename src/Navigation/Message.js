import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios'

class Messages extends React.Component{
  state = {
    users: [],
    messages: [],
    eventId: 6,
    userId: 14,
    message: ''
  }
  async componentDidMount() {
    const eventId = this.props.navigation.getParam('eventId', 'NO-ID')
    this.setState({eventId: eventId})
    const usersResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${eventId}/users`);
    const msgResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${eventId}/messages`);

    this.setState({users: usersResponse.data, messages: msgResponse.data})
    this.socket = io('http://tjommis.eu-central-1.elasticbeanstalk.com/', {
      extraHeaders: {
          Authorization: 'Test'
      }
    });
    this.socket.emit('join', eventId)
    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });
    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
    };
    console.log(usersResponse.data)
    console.log(msgResponse.data)
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
        {this.state.messages.map((message, i) => {
          return (<View key={i} style={styles.message}>
            <Text>{message.message}</Text>
          </View>)
        })}
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
