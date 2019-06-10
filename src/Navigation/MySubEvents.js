import React from 'react';
import {View, StyleSheet , ActivityIndicator, FlatList, Text} from 'react-native';
import SubEventCard from '../Components/SubEventCard';
import axios from 'axios'

class MySubEvents extends React.Component{
  constructor(){
    super();
    this.state = {
      items:[]
    }
  }

  async componentDidMount(){
    const eventId = this.props.navigation.getParam('eventId', 'NO-ID')
    console.log('eventid', eventId)
    const subsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${eventId}/subs`)
    this.setState({items: subsResponse.data})
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
      <View style={{alignItems: 'center',}}>
        <View style={styles.flexRow}>
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
    headerText: {
      fontSize: 24
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
      backgroundColor: '#4ABDAC',
      borderColor: '#4ABDAC',
      borderWidth: 3,
      borderRadius: 6,
      margin: 10,
      padding: 10,
      width:'85%',
      marginLeft: '7.5%',
      height: 50
    },
    btnText:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18
    },
  });

  export default MySubEvents;
