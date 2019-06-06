import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import IconFA from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';

class EventDetails extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            items: [],
            eventIdText: '',
            joined: false
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('eventId')
            if (value !== null) {
                this.setState({ eventIdText: value }, async () => {
                    const eventResponse = await axios.get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/' + this.state.eventIdText);
                    this.setState({ items: eventResponse.data })
                    const userId = await AsyncStorage.getItem('userId')
                    const userEventsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`)
                    userEventsResponse.data.forEach(event => {
                        if(event.id == value) this.setState({joined: true})
                    })
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

    joinEvent = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const joinResponse = await axios.post(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`, { eventId: this.state.eventIdText })
        if(joinResponse.status === 201) {
            this.setState({joined: true})
        }
    }

    LeaveEvent = async () => {
        const userId = await AsyncStorage.getItem('userId');

        const leaveResponse = await axios.delete(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events/${this.state.eventIdText}`)
        leaveResponse.status === 204 ? this.setState({joined: false}) : null
    }

    render() {
        //Adding a random date before the time, to properly display the time
        const getTime = "2020-01-03 " + this.state.items.time
        return (
            <View style={styles.event}>
                <Image style={styles.eventImage} source={{ uri: 'https://i.imgur.com/1jONy1i.jpg' }} />
                <View style={styles.topInfo}>
                    <View style={styles.flexRow}>
                        <Text style={styles.eventTitle}>{this.state.items.title}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Text style={styles.eventLocation}>{this.state.items.location}</Text>
                        <Text style={styles.eventDate}>{moment(this.state.items.date).format('Do MMM YYYY')} - {moment(getTime).format('HH:mm')}</Text>
                    </View>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.eventInfo}>Info om eventet</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.eventText}>{this.state.items.description}</Text>
                </View>
                {this.state.joined !== true ?
                <TouchableOpacity
                    style={styles.btnJoin}
                    onPress={this.joinEvent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.btnText}>Join event</Text>
                        <IconFA
                            name="user-plus"
                            size={20}
                            color={'white'}
                        />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.btnLeave}
                    onPress={this.LeaveEvent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.btnText}>Leave event  </Text>
                        <IconFA
                            name="user-plus"
                            size={20}
                            color={'white'}
                        />
                    </View>
                </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    event: {
        backgroundColor: 'white',
        height: '100%'
    },
    topInfo: {
        backgroundColor: '#ECF0F1',
        flexDirection: 'column'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    eventImage: {
        width: '100%',
        height: 125,
        resizeMode: 'cover'
    },
    eventTitle: {
        padding: 4,
        fontSize: 24,
        color: '#4ABDAC'
    },
    eventInfo: {
        paddingLeft: '35%',
        paddingTop: 5,
        paddingBottom: 10
    },
    eventText: {
        padding: 4,
    },
    eventLocation: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 5,
        fontSize: 12
    },
    eventDate: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 5,
        opacity: 0.6,
        fontSize: 12
    },
    btnJoin: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#4ABDAC',
        borderColor: '#4ABDAC',
        borderWidth: 3,
        borderRadius: 6,
        margin: 10,
        padding: 10,
        width: '85%',
        marginLeft: '7.5%',
        height: 50
    },
    btnLeave: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#F95937',
        borderColor: '#E95130',
        borderWidth: 3,
        borderRadius: 6,
        margin: 10,
        padding: 10,
        width: '85%',
        marginLeft: '7.5%',
        height: 50
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default EventDetails;

