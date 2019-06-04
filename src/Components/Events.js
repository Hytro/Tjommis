import React from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';
import EventCard from './EventCard';
import AsyncStorage from '@react-native-community/async-storage';

class Events extends React.Component{

  constructor(){
    super();
    this.state = {
      items:[],
      token: []
    }
  }

  componentDidMount(){
    this._get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/').then(
      data=> {
        this.setState({items: data})
      }
    )
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        console.warn('event tok: ', value)
      }
    } catch(e) {
      // error reading value
    }
  };
  
  storeUser = async (idUser) => {
    try {
      await AsyncStorage.setItem('userId', idUser)
      console.warn('UserId: ', idUser)
    } catch (e) {
      
    }
  };

  _get = async (endpoint) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  }

  render() {
    if(this.state.items.length===0){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return(
      <FlatList 
      style={styles.container}
      data={this.state.items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <EventCard navigation={this.props.navigation} item={item}/>}
      />
    );
  }
}

const styles = StyleSheet.create({
  container:{
      paddingTop: 10,
      backgroundColor: '#F5FCFF',
  },
  loader:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Events;