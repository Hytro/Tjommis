import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import IconFA from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import ImagePicker from 'react-native-image-picker'

class EventDetails extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            eventIdText: '',
            joined: false,
            created_at: '',
            creator_id: 0,
            date: '',
            description: '',
            id: 0,
            image_url: '',
            location: '',
            time: '',
            title: ''
        }
    }
    // gets the correct token from the database and add it on the correct userid
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('eventId')
            if (value !== null) {
                this.setState({ eventIdText: value }, async () => {
                    const eventResponse = await axios.get('http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/' + this.state.eventIdText);
                    this.setState({
                        created_at: eventResponse.data.created_at,
                        creator_id: eventResponse.data.creator_id,
                        date: eventResponse.data.date,
                        description: eventResponse.data.description,
                        id: eventResponse.data.id,
                        image_url: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + eventResponse.data.image_url,
                        location: eventResponse.data.location,
                        time: eventResponse.data.time,
                        title: eventResponse.data.title
                    })
                    console.log(eventResponse.data)
                    const userId = await AsyncStorage.getItem('userId')
                    const userEventsResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`)
                    userEventsResponse.data.forEach(event => {
                        if (event.id == value) this.setState({ joined: true })
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
    // lets the user join events with user id
    joinEvent = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const joinResponse = await axios.post(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events`, { eventId: this.state.eventIdText })
        if (joinResponse.status === 201) {
            this.setState({ joined: true })
            this.props.navigation.navigate('Messages')
        }
    }
    // lets the user leave events with user id
    LeaveEvent = async () => {
        const userId = await AsyncStorage.getItem('userId');

        const leaveResponse = await axios.delete(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/events/${this.state.eventIdText}`)
        leaveResponse.status === 204 ? this.setState({ joined: false }) : null
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
            console.log("Picker response", response)
            this.setState({ image_url: response.uri })
            const bodyFormData = new FormData();
            bodyFormData.append('imageData', {
                uri: response.uri,
                type: 'image/jpeg', // or photo.type
                name: response.fileName
            })

            axios({
                method: 'post',
                url: `http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/${this.state.eventIdText}/image`,
                data: bodyFormData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then(function (response) {
                //handle success
                console.log(response);
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });
            }
        })
    }

    render() {
        // Adding a date timer
        const getTime = "2020-01-03 " + this.state.time
        return (
            <View style={styles.event}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                    <Image style={styles.eventImage} source={{uri: this.state.image_url}} />
                </TouchableOpacity>
                <View style={styles.topInfo}>
                    <View style={styles.flexRow}>
                        <Text style={styles.eventTitle}>{this.state.title}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={styles.flexRowHalf}>
                            <IconFA
                                name="map-marker"
                                size={20}
                                color="#4ABDAC"
                            />
                            <Text style={styles.eventLocation}>{this.state.location}</Text>
                        </View>
                        <View style={styles.flexRowHalf}>
                            <IconFA
                                name="calendar"
                                size={18}
                                color="#4ABDAC"
                            />
                            <Text style={styles.eventDate}>  {moment(this.state.date).format('Do MMM YYYY')} - {moment(getTime).format('HH:mm')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.eventInfo}>Info om eventet:</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.eventText}>{this.state.description}</Text>
                </View>
                {this.state.joined !== true ?
                    <TouchableOpacity
                        style={styles.btnJoin}
                        onPress={this.joinEvent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnText}>Delta på event </Text>
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
                            <Text style={styles.btnText}>Forlat event </Text>
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

/********************************* Stylesheet Start *********************************/
const styles = StyleSheet.create({
    event: {
        backgroundColor: 'white',
        height: '100%',
    },
    topInfo: {
        backgroundColor: '#ECF0F1',
        flexDirection: 'column'
    },
    flexRow: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    flexRowHalf: {
        flexDirection: 'row',
        width: '50%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    eventImage: {
        width: '100%',
        height: 175,
        resizeMode: 'cover'
    },
    eventTitle: {
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 24,
        color: '#4ABDAC'
    },
    eventInfo: {
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 10,
        fontSize: 16
    },
    eventText: {
        paddingTop: 4,
        paddingBottom: 4
    },
    eventLocation: {
        paddingTop: 4,
        paddingBottom: 8,
        paddingLeft: 5,
        fontSize: 12
    },
    eventDate: {
        paddingTop: 4,
        paddingBottom: 8,
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
/********************************* Stylesheet End *********************************/

export default EventDetails;

