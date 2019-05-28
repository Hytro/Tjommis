import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Welcome from './WelcomeScreen';
import Events from '../Components/Events';
import Messages from './Messages';
import Profile from './Profile';
import MyEvents from './MyEvents';

import {
  createSwitchNavigator, 
  createAppContainer, 
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';


class Navigation extends Component {
  render() {
    return <AppContainer />;
  }
}

export default Navigation; 


class EventDetail extends Component{
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Event Details</Text>
      </View>
    );
  }
}

const EventStack = createStackNavigator({
  Events:{
    screen: Events,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'Events',
        headerLeft:(
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  },
  EventDetail:{
    screen: EventDetail
  }
},{
  defaultNavigationOptions:{
    gesturesEnabled: false
  }
});

const MessageStack = createStackNavigator({
  Messages:{
    screen: Messages,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'Messages',
        headerLeft:(
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const MyEventStack = createStackNavigator({
  MyEvents:{
    screen: MyEvents,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'MyEvents',
        headerLeft:(
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const ProfileStack = createStackNavigator({
  Profile:{
    screen: Profile,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'Profile',
        headerLeft:(
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});


const DashboardTabNavigator = createBottomTabNavigator({
  EventStack,
  MessageStack,
  MyEventStack,
  ProfileStack
},{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return{
      headerTitle:routeName
    }
  }
});

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: null,
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:{
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Dashboard:{screen:AppDrawerNavigator}
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
