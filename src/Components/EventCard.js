import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import IconFA from 'react-native-vector-icons/FontAwesome'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment';

// setting ID on Eventcards
class EventCard extends React.PureComponent {
    storeData = async (eventId) => {
        try {
            await AsyncStorage.setItem('eventId', eventId + "")
        } catch (e) {
            console.log("EVENT ID NOT SET", e)
        }
    }

    goToEventDetail() {
        this.props.navigation.navigate('EventDetail')
    }

    saveAndGo() {
        this.storeData(this.props.item.id)
        this.goToEventDetail();
    }

    render() {
        //Adding a random date before the time, to properly display the time
        const getTime = "2020-01-03 " + this.props.item.time
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => this.saveAndGo()}>
                <View style={styles.flexRow}>
                    <Text style={styles.cardTitle}>{this.props.item.title}</Text>
                    <Text style={styles.cardDate}>{moment(this.props.item.date).endOf('day').fromNow()} </Text>
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.cardLocation}>{this.props.item.location}</Text>
                    <Text style={styles.cardTime}>{moment(this.props.item.date).format('Do MMM YYYY')} - {moment(getTime).format('HH:mm')}</Text>
                </View>
                <View>
                <Image style={styles.cardImage} source={{uri: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + this.props.item.image_url}} />
                </View>
                <View style={styles.flexRowBottom}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconFA5
                            style={{ paddingTop: 4 }}
                            name="users"
                            size={20}
                            color={'#4ABDAC'}
                        />
                        <Text style={{ fontSize: 10, opacity: 0.7 }}> Antall</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconFA
                            style={{ paddingTop: 4 }}
                            name="share-square-o"
                            size={20}
                            color={'#4ABDAC'}
                        />
                        <Text style={{ fontSize: 10, opacity: 0.7 }}> Del</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

/********************************* Stylesheet Start *********************************/
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
/********************************* Stylesheet End *********************************/

export default EventCard;