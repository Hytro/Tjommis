import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

class NewEvent extends React.Component {

  constructor() {
    super();
    this.state = {
      title: '',
      location: '',
      description: '',
      date: '',
      time: '',
      userId: 0
    }
  }

  async componentDidMount() {
    this.setState({ userId: await AsyncStorage.getItem('userId') })
  }

  /****************** UPDATE STATES START ******************/
  updateValue(text, field) {
    if (field == 'title') {
      this.setState({
        title: text,
      })
    }
    else if (field == 'location') {
      this.setState({
        location: text,
      })
    }
    else if (field == 'description') {
      this.setState({
        description: text,
      })
    }
    else if (field == 'date') {
      this.setState({
        date: text,
      })
    }
    else if (field == 'time') {
      this.setState({
        time: text,
      })
    }
    else if (field == 'userId') {
      this.setState({
        userId: text,
      })
    }
  }

  /****************** UPDATE STATES END ******************/

  // getting the correct value from Events API
  submit() {
    let collection = {}
    collection.title = this.state.title
    collection.location = this.state.location
    collection.description = this.state.description
    collection.date = this.state.date
    collection.time = this.state.time
    collection.userId = this.state.userId


    var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/';

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      res.json()
      //console.warn(collection)
      if (res.status === 201) {
        this.props.navigation.goBack()
      }
      //console.warn(res.status)
    })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View styles={styles.regform}>
          <View styles={styles.topPart}>
            <Text style={styles.header}>Opprett et nytt event</Text>
          </View>
          <View styles={styles.middlePart}>
            <TextInput
              style={styles.textInput}
              placeholder="Event Title"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.updateValue(text, 'title')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Event Location"
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.updateValue(text, 'location')}
            />
            <DatePicker
              style={styles.dateTime}
              date={this.state.date}
              showTimeSelect
              timeCaption="Time"
              mode="date"
              placeholder="Dato for event"
              format="YYYY-MM-DD"
              minDate={new Date()}
              maxDate="2100-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  opacity: 0
                },
                dateText: {
                  color: "#f8f8f8"
                },
                placeholderText: {
                  color: '#000',
                  opacity: 0.25
                },
                dateInput: {
                  borderWidth: 0,
                  alignItems: "flex-start"
                }
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
            <DatePicker
              style={styles.dateTime}
              date={this.state.time}
              mode="time"
              placeholder="Tid for event"
              format="HH:mm"
              minTime="00:00"
              maxTime="23:59"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  opacity: 0
                },
                dateText: {
                  color: "#f8f8f8"
                },
                placeholderText: {
                  color: '#000',
                  opacity: 0.25
                },
                dateInput: {
                  borderWidth: 0,
                  alignItems: "flex-start",
                }
              }}
              onDateChange={(time) => { this.setState({ time: time }) }}
            />
            <TextInput
              style={styles.textInputDescription}
              placeholder="Event Description"
              editable={true}
              multiline={true}
              numberOfLines={5}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.updateValue(text, 'description')}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.submit()} >
            <Text style={styles.btnText}>Opprett event</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/********************************* Stylesheet Start *********************************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4ABDAC',
    paddingLeft: 60,
    paddingRight: 60
  },
  regform: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  dateTime: {
    width: 255,
    marginBottom: 30,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  textInput: {
    height: 40,
    marginBottom: 30,
    width: 255,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  textInputDescription: {
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  btn: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#42A99A',
    marginTop: 30
  },
  btnText: {
    color: '#ECF0F1',
    fontWeight: 'bold'
  },
});
/********************************* Stylesheet End *********************************/

export default NewEvent;