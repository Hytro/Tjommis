import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';




class Profile extends Component {
  state = {
    user: {
      firstName: '-',
      lastName: '-',
      image_url: '-',
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const userResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/me`, { token })
    this.setState({ user: userResponse.data })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{`${this.state.user.firstName} ${this.state.user.lastName}`}</Text>
            <Text style={styles.info}>Høyskolen Kristiania - Westerdals</Text>
            <Text style={styles.description}>Jeg er en student som går Frontend- og Mobilutvikling ved Høyskolen Kristiania. Jeg digger å game, dra på konserter, ta en fin tur på kino, eller vandre tankeløst på en lang skogtur!</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Fjelltur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Gaming</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Fisking</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Konserter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Skogtur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Hunder</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Programmering</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Fotografi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{color: 'white'}}>Musikk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

/*********************************Stylesheet Start*********************************/
const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(74, 189, 172)",
    height: 125,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "rgb(74, 189, 172)",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center',
    paddingBottom: 25
  },
  buttonContainer: {
    margin: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    borderRadius: 30,
    backgroundColor: "rgb(74, 189, 172)",
  },
});
/*********************************Stylesheet End*********************************/

export default Profile;