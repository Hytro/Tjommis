import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import EventCard from './EventCard';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class Events extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
      token: []
    }
  }
  // chatching the right event id from api
  async componentDidMount() {
    this._get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/').then(
      data => {
        this.setState({ items: data })
      }
    )
    axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');
    const userResponse = await axios.get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/me');
    await AsyncStorage.setItem('userId', userResponse.data.id + "")
  }
  // token controller
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      console.log("token", value)
      if (value !== null) {
        console.warn('event tok: ', value)
      }
    } catch (e) {
      // error reading value
    }
  };

  _get = async (endpoint) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  }

  render() {
    // adding scrolling on lists
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <FlatList
        style={styles.container}
        data={this.state.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <EventCard navigation={this.props.navigation} item={item} />}
      />
    );
  }
}

/********************************* Stylesheet Start *********************************/
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
/********************************* Stylesheet End *********************************/

export default Events;