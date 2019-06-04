import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import EventCard from '../Components/EventCard';

class MyEvents extends React.Component{
  constructor(){
    super();
    this.state = {
      items:[]
    }
  }

  componentDidMount(){
    this._get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/30/events/').then(
      data=> {
        this.setState({items: data})
      }
    )
    fetch('http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/me')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
      });
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('NewEvent')}>
          <Text style={styles.btnText}>NewEvent</Text>
        </TouchableOpacity>
        <FlatList 
          style={styles.containerFL}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <EventCard navigation={this.props.navigation} item={item}/>}
        />
      </View>
    )}
      
    _get = async (endpoint) => {
      const res = await fetch(endpoint);
      const data = await res.json();
      return data;
      }
    }
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    containerFL:{
      paddingTop: 10,
      width: 350,
      backgroundColor: '#FAFAFA',
    },
    loader:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:{
      alignSelf: 'stretch',
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: '#4ABDAC',
      borderWidth: 3,
      borderRadius: 6,
      margin: 10,
      padding: 30
    },
    btnText:{
      color: '#4ABDAC',
      fontWeight: 'bold'
    },
  });

  export default MyEvents;
