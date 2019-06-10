import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class Messages extends React.Component{
    state = {
      events: []
    }
    // If the page is rendered correctly, get the current users id, and get the list of the
    // events that the selected user is interessted in/created
    async componentDidMount() {
      const userId = await AsyncStorage.getItem('userId');
      const eventsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`)
      this.setState({events: eventsResponse.data})
    }
    // Navigates the user to a specific message chain, with the given event id
    goToMessageRoom(id) {
      this.props.navigation.navigate('Message', {eventId: id})
    }

    render() {
      // Displays a scrollable flatlist with a list of all the event chats that the user is
      // currently interested in.
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
    
  /********************************* Stylesheet Start *********************************/
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
    },
  });
  /********************************* Stylesheet End *********************************/

  export default Messages;
