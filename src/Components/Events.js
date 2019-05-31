import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';
import EventCard from './EventCard';

class Events extends React.Component{

  constructor(){
    super();
    this.state = {
      items:[]
    }
  }

  componentDidMount(){
    this._get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/').then(
      data=> {
        this.setState({items: data})
      }
    )
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
    _get = async (endpoint) => {
      const res = await fetch(endpoint);
      const data = await res.json();
      return data;
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