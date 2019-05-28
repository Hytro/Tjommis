import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';


class EventCard extends React.PureComponent{
    render() {
      return(
          <TouchableOpacity 
            style={styles.card}
            onPress={()=>this.props.navigation.navigate('EventDetail')}
          >
              <Text style={styles.cardTitle}>{this.props.item.title}</Text>
              <Image style={styles.cardImage} source={{uri:'https://www.visitoslo.com/PageFiles/1545/Oslo%20Mekaniske%20Tord%20Baklund.jpg?t=ScaleToFill%7C1450x720&ts=XDgpGh8lQVI%2BmuOGGMTcpSlnp78%3D&pr=2.625'}} />
              <Text style={styles.cardText}>{this.props.item.description}</Text>
              <Text style={styles.cardTextBody}>{this.props.item.date}</Text>
              <Text style={styles.cardTextBody}>{this.props.item.time}</Text>
          </TouchableOpacity>
      );
    }
  }

export default EventCard;

const styles = StyleSheet.create({
    card:{
        backgroundColor:'#fff',
        marginBottom: 10,
        marginLeft:'2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity:0.2,
        shadowRadius:1,
        shadowOffset:{
            width:3,
            height:3
        }
    },
    cardImage:{
        width: '100%',
        height: 200,    
        resizeMode: 'cover'
    },
    cardText:{
        padding:10,
        fontSize:16
    },
    cardTextBody:{
        padding:10,
        fontSize:10
    },
    cardTitle:{
        padding:4,
        fontSize:20
    }
});