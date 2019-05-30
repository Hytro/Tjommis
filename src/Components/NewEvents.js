import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


class NewEvent extends React.Component{

  constructor(){
    super();
    this.state={
      title:'',
      description:'',
      date:'',
      time:'',
      userId:''
    }
  }

  updateValue(text, field){
    if(field=='title'){
      this.setState({
        email:text,
      })
    }
    else if(field=='description'){
      this.setState({
        password:text,
      })
    }
    else if(field=='date'){
        this.setState({
          password:text,
        })
      }
    else if(field=='time'){
      this.setState({
        password:text,
      })
    }
    else if(field=='userId'){
        this.setState({
          password:text,
        })
      }
  }

  submit(){
        let collection={}
      collection.email=this.state.title
      collection.password=this.state.description
      collection.email=this.state.date
      collection.email=this.state.time
      collection.email=this.state.userId


      var url = 'http://tjommis.eu-central-1.elasticbeanstalk.com/api/events/';
      
      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        },  
      }).then((res) =>{res.json()
        if(res.status === 200){
          console.warn(this.props);
          this.props.navigation.navigate('Dashboard')
        }

        console.warn(res.status)
      })
      .catch(error => console.error('Error:', error));
  }

    render() {
      return(
        <View style={styles.container}>
          <View styles={styles.regform}>
            <Text style={styles.header}>Create a new event</Text>

            <TextInput 
              style={styles.textInput} 
              placeholder="Event Title" 
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'title')}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Event Description" 
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'description')}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Event Date" 
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'date')}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Event Time" 
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'time')}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="User ID placeholder thing" 
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.updateValue(text, 'userId')}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.submit()} >
              <Text style={styles.btnText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  export default NewEvent;
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4ABDAC',
      paddingLeft: 60,
      paddingRight: 60
    },
    regform:{
      alignSelf: 'stretch'
    },
    header:{
      fontSize: 24,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
    },
    textInput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1
    },
    btn:{
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#42A99A',
      marginTop: 30
    },
    btnText:{
      color: '#ECF0F1',
      fontWeight: 'bold'
    },

  });