import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import axios from 'axios';

//Event card bilde hentet fra server
// <Image style={styles.cardImage} source={{uri: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + this.props.item.image_url}} />

class EventDetails extends React.PureComponent {


    async getProfile() {

        var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/30';
        const response = await axios.get(url);
        if (response.status === 200) {
            console.warn("Dank boi works")
        }
    }



    render() {
        return (
            <View style={styles.card}>
                <Image style={styles.cardImage} source={{ uri: 'https://www.mch-group.com/-/media/mch-group/Images/Content/News/Blog/2017/2017-04/mch-group-live-marketing-aktivierung.jpg' }} />
                <Text style={styles.cardTitle}>Dank Titel</Text>
                <Text style={styles.cardText}>Dank lokasjon</Text>
                <Text style={styles.cardTextBody}>Info om evenet</Text>
                <Text style={styles.cardTextBody}>Dank beskrivelse av eventet</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft: '5%',
        width: '90%',
        borderWidth: 0.1,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        }
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '98%',
        marginLeft: '1%'
    },
    flexRowBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginLeft: '7.5%',
        paddingTop: 7,
        paddingBottom: 7
    },
    cardImage: {
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
    cardTitle: {
        padding: 4,
        fontSize: 20
    },
    cardDate: {
        paddingTop: 15,
        paddingRight: 5,
        opacity: 0.6,
        fontSize: 12
    }
});

export default EventDetails;