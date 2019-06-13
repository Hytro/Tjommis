import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker'

class Profile extends Component {
  state = {
    firstName: '-',
    lastName: '-',
    image_url: '-',
    id: 0
  }

  // If the page is rendered correctly, axios will use the user token and get the proper profile data
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const userResponse = await axios.get(`http://tjommis.eu-central-1.elasticbeanstalk.com/api/auth/me`, { token })
    console.log(userResponse.data)
    this.setState({
      firstName: userResponse.data.firstName,
      lastName: userResponse.data.lastName,
      id: userResponse.data.id,
      image_url: 'http://tjommis.eu-central-1.elasticbeanstalk.com/' + userResponse.data.image_url
    })

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
          url: `http://tjommis.eu-central-1.elasticbeanstalk.com/api/users/${this.state.id}/image`,
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

  // This is currently a dummy profile. The avatar is a static picture collected from the database.
  // The description and filters for each user is currently static.
  // The name is displayed by the user info in the database
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <TouchableOpacity style={styles.avatarTouch} onPress={this.handleChoosePhoto}>
          <Image style={styles.avatar} source={{ uri: this.state.image_url }} />
        </TouchableOpacity>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{`${this.state.firstName} ${this.state.lastName}`}</Text>
            <Text style={styles.info}>Høyskolen Kristiania - Westerdals</Text>
            <Text style={styles.description}>Jeg er en student som går Frontend- og Mobilutvikling ved Høyskolen Kristiania. Jeg digger å game, dra på konserter, ta en fin tur på kino, eller vandre tankeløst på en lang skogtur!</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Fjelltur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Gaming</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Fisking</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Konserter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Skogtur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Hunder</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Programmering</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Fotografi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ color: 'white' }}>Musikk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

/********************************* Stylesheet Start *********************************/
const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(74, 189, 172)",
    height: 125,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -5
  },
  avatarTouch: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50
  },
  name: {
    fontSize: 22,
    color: "#000000",
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
/********************************* Stylesheet End *********************************/

export default Profile;