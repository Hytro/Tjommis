import React from 'react';
import {View, StyleSheet , ActivityIndicator, FlatList, Text} from 'react-native';
import SubEventCard from '../Components/SubEventCard';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class MySubEvents extends React.Component{
  constructor(){
    super();
    this.state = {
      items:[]
    }
  }

  // If the page is rendered correctly, axios will get the current eventID and 
  // use this eventID to populate the item array with the database data of the users
  // sub events
  async componentDidMount(){
    const eventId = this.props.navigation.getParam('eventId', 'NO-ID')
    const userId = await AsyncStorage.getItem('userId');
    const userSubsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/subs`)
    const subsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${eventId}/subs`)
    subsResponse.data.forEach(sub => {
      userSubsResponse.data.forEach(uSub => {
        if(sub.id === uSub.id) {
          sub.joined = true;
        }
      })
    })
    this.setState({items: subsResponse.data})
  }

  render() {
    // If there are no events in the event list, display an activity indicator
    if(this.state.items.length===0){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return(
      <View style={{alignItems: 'center', backgroundColor: 'white'}}>
        <Text>{this.state.items.title}</Text>
        <View>
            <Text style={styles.headerText}>Undereventer</Text>
        </View>
        <FlatList 
          style={styles.containerFL}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <SubEventCard navigation={this.props.navigation} item={item}/>}
        />
      </View>
    )}
  }
    
  /********************************* Stylesheet Start *********************************/
  const styles = StyleSheet.create({
    headerText: {
      fontSize: 24
    },
    containerFL:{
      paddingTop: 10,
      width: 350
    },
    loader:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  /********************************* Stylesheet End *********************************/

  export default MySubEvents;
