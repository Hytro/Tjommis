import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import IconFA from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';

class SubEventCard extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            joined: false,
            subId: 0
        }
    }

    async componentDidMount() {
        this.setState({joined: this.props.item.joined ? true : false})
    }

    storeData = async (eventId) => {
        try {
            await AsyncStorage.setItem('eventId', eventId + "")
        } catch (e) {
            console.log("EVENT ID NOT SET", e)
        }
    }

    // letting the user join on sub events
    joinSubEvent = async () => {
        const userId = await AsyncStorage.getItem('userId');
        console.log("subId", this.props.item.id)
        const joinResponse = await axios.post(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/subs`, { subId: this.props.item.id })
        if (joinResponse.status === 201) {
            this.setState({ joined: true })
            //this.props.navigation.navigate('Messages')
        }
    }

    // letting the user leave on sub events
    LeaveSubEvent = async () => {
        const userId = await AsyncStorage.getItem('userId');

        const leaveResponse = await axios.delete(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${userId}/subs/${this.props.item.id}`)
        leaveResponse.status === 204 ? this.setState({ joined: false }) : null
    }

    render() {
        //Adding a random date before the time, to properly display the time
        const getTime = "2020-01-03 " + this.props.item.time
        return (
            <TouchableOpacity
                style={styles.card}>
                <View>
                    <View style={{ alignSelf: 'center', position: 'absolute', borderBottomColor: 'black', borderBottomWidth: 1, height: '50%', width: '70%', right: 10, top: 15 }} />
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.cardTime}>{moment(this.props.item.date).format('Do MMM')}</Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.cardTitle}>{this.props.item.title}</Text>
                    <Text style={styles.cardDate}>{moment(getTime).format('HH:mm')} </Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.cardDescription}>{this.props.item.description}</Text>
                </View>
                {this.state.joined !== true ?
                    <TouchableOpacity
                        style={styles.btnJoin}
                        onPress={this.joinSubEvent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnText}>Delta på underevent</Text>
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
                        onPress={this.LeaveSubEvent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnText}>Forlat underevent </Text>
                            <IconFA
                                name="user-plus"
                                size={20}
                                color={'white'}
                            />
                        </View>
                    </TouchableOpacity>
                }
            </TouchableOpacity>
        );
    }
}

/********************************* Stylesheet Start *********************************/
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        marginBottom: 20,
        marginLeft: '2.5%',
        width: '95%'
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '98%',
        marginLeft: '1%'
    },
    cardTitle: {
        padding: 4,
        fontSize: 18
    },
    cardDescription: {
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
        paddingLeft: 4,
        opacity: 0.6,
        fontSize: 18
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
        fontSize: 18,
        paddingRight: 8
    }
});
/********************************* Stylesheet End *********************************/

export default SubEventCard;