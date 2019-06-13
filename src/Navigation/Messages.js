import React from 'react';
import {View, Image, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import IconAD from 'react-native-vector-icons/AntDesign';

class Messages extends React.Component{
    state = {
      events: []
    };

    componentWillUnmount() {
      this.reRenderList;
    }

    // If the page is rendered correctly, get the current users id, and get the list of the
    // events that the selected user is interessted in/created
    async componentDidMount() {
      this.reRenderList = this.props.navigation.addListener('willFocus', async () => {
        const userId = await AsyncStorage.getItem('userId');
        const eventsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`)
        this.setState({events: eventsResponse.data})
        const subResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/subs`)
        const subs = subResponse.data.map(sub => {
          return {...sub, id: 'sub' + sub.id}
        })
        this.setState({
          events: [...this.state.events, ...subs]
        }, () => console.log(this.state.events))
        console.log(subResponse.data)
      });
      
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
        renderItem={({ item}) => 
        <TouchableOpacity onPress={() => this.goToMessageRoom(item.id)}>
          <View style={styles.chat}>
            <Image style={styles.avatar} source={{uri: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + item.image_url}}/>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.goToChat}>Gå til chat</Text>
                <IconAD
                    style={{ paddingTop: 13 }}
                    name="right"
                    size={20}
                    color={'#4ABDAC'}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>}
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
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    chat: {
      flexDirection: 'row',
      height: 70,
      width: '100%',
      backgroundColor: '#ffffff',
      padding: 10,
      marginTop: 10
    },
    avatar: {
      borderRadius: 30,
      height: 50,
      width: 50
    },
    title: {
      paddingTop: 15,
      paddingLeft: 10
    },
    goToChat: {
      paddingTop: 15,
      color: '#4ABDAC'
    }
  });
  /********************************* Stylesheet End *********************************/

  export default Messages;
