import React from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//Event card bilde hentet fra server
// <Image style={styles.cardImage} source={{uri: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + this.props.item.image_url}} />

class EventDetails extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            items: [],
            eventIdText: ''
        }
        this.getData()
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('eventId')
            if (value !== null) {
                console.warn('user Id: ', value)
                this.setState({eventIdText:value}, async () => {
                    const eventResponse = await axios.get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/' + this.state.eventIdText);
                    this.setState({ items: eventResponse.data })
                })
            }
            return value
        } catch (e) {
            // error reading value
        }
    };

    async componentDidMount() {
        this.getData()
    }

    _get = async (endpoint) => {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
    }

    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{this.state.items.title}</Text>
                <Image style={styles.cardImage} source={{ uri: 'https://i.imgur.com/1jONy1i.jpg' }} />
                <Text style={styles.cardTitle}>{this.state.items.location}</Text>
                <Text style={styles.cardText}>{this.state.items.description}</Text>
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
        width: '90%'
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
    cardTitle: {
        padding: 4,
        fontSize: 18
    },
    cardLocation: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 5,
        fontSize: 12
    },
    cardDate: {
        paddingTop: 8,
        paddingRight: 5,
        opacity: 0.6,
        fontSize: 12
    },
    cardTime: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 5,
        opacity: 0.6,
        fontSize: 12
    }
});

export default EventDetails;

