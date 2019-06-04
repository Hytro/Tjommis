import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import axios from 'axios';

//Event card bilde hentet fra server
// <Image style={styles.cardImage} source={{uri: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + this.props.item.image_url}} />

class EventDetails extends React.PureComponent {


    async getProfile(){
    
          var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/30';
          const response = await axios.get(url);
          if(response.status === 200) {
            console.warn("Dank boi works")
          }
      }


    
    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{this.props.item.title}</Text>
                <Image style={styles.cardImage} source={{ uri: 'https://www.mch-group.com/-/media/mch-group/Images/Content/News/Blog/2017/2017-04/mch-group-live-marketing-aktivierung.jpg' }} />
                <Text style={styles.cardText}>Dank</Text>
                <Text style={styles.cardTextBody}>Dank</Text>
                <Text style={styles.cardTextBody}>Dank</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'lightgray',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    cardImage: {
        width: '100%',
        height: 200,
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
    cardTitle: {
        padding: 4,
        fontSize: 20
    }
});

export default EventDetails;