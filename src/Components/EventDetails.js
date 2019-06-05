import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
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
                <Image style={styles.cardImage} source={{ uri: 'https://i.imgur.com/1jONy1i.jpg' }} />
                <View styles={styles.flexRow}>
                    <Text style={styles.cardTitle}>{this.state.items.title}</Text>
                </View>
                <View>
                    <Text style={styles.cardTitle}>{this.state.items.location}</Text>
                    <Text style={styles.cardTitle}>{this.state.items.date}</Text>
                </View>
                <View>
                    <Text style={styles.cardText}>{this.state.items.description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white'
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        marginLeft: '10%'
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
        width: '100%',
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

