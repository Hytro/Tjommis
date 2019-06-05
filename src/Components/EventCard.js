import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, tintColor } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import IconFA from 'react-native-vector-icons/FontAwesome'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment';

//Event card bilde hentet fra server
// <Image style={styles.cardImage} source={{uri: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + this.props.item.image_url}} />

class EventCard extends React.PureComponent {

    goToEventDetail() {
        this.props.navigation.navigate('EventDetail')
      }
    
      saveAndGo(){
        this.storeEventId(this.props.item.id)
        this.goToEventDetail();
      }

    render() {
      //Adding a random date before the time, to properly display the time
      const getTime = "2020-01-03 " + this.props.item.time
      return(
          <TouchableOpacity 
            style={styles.card}
            onPress={()=>this.saveAndGo()}>
            <View style={styles.flexRow}>
            <Text style={styles.cardTitle}>{this.props.item.id}</Text>
                <Text style={styles.cardTitle}>{this.props.item.title}</Text>
                <Text style={styles.cardDate}>{moment(this.props.item.date).endOf('day').fromNow()} </Text>
            </View>
            <View style={styles.flexRow}>
                <Text style={styles.cardTitle}>{this.props.item.location}</Text>
                <Text style={styles.cardDate}>{moment(this.props.item.date).format('Do MMM YYYY')} - {moment(getTime).format('HH:mm')}</Text>
            </View>
            <View>
                <Image style={styles.cardImage} source={{uri: 'https://i.imgur.com/1jONy1i.jpg'}} />
            </View>
            <View style={styles.flexRowBottom}>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconFA5
                        style={{ paddingTop: 4 }}
                        name="users" 
                        size={20}
                        color={ '#4ABDAC' }
                    />
                    <Text style={{fontSize: 10, opacity:0.7}}> TODO</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconFA
                        style={{ paddingTop: 4 }}
                        name="share-square-o" 
                        size={20}
                        color={ '#4ABDAC' }
                    />
                    <Text style={{fontSize: 10, opacity:0.7}}> TODO</Text>
                </View>
            </View>
          </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white',
        marginBottom: 20,
        marginLeft:'5%',
        width: '90%',
        borderWidth: 0.1,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOpacity:0.5,
        shadowRadius:5,
        shadowOffset:{
            width:0,
            height:0
        }
    },
    flexRow:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '98%',
        marginLeft: '1%'
    },
    flexRowBottom:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '85%',
        marginLeft: '7.5%',
        paddingTop: 7,
        paddingBottom: 7
    },
    cardImage:{
        width: '95%',
        marginLeft: '2.5%',
        height: 125,    
        resizeMode: 'cover'
    },
    cardText: {
        padding: 10,
        fontSize: 16
    },
    cardTextBody: {
        padding: 10,
        fontSize: 10
    },
    cardTitle:{
        padding:4,
        fontSize:20
    },
    cardDate: {
        paddingTop: 15,
        paddingRight: 5,
        opacity: 0.6,
        fontSize: 12
    }
});

export default EventCard;

storeEventId = async (eventId) => {
    try {
      await AsyncStorage.setItem('eventId', eventId)
      console.warn('eventId: ', eventId)
    } catch (e) {

    }
  }