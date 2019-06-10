import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAD from 'react-native-vector-icons/AntDesign';
import Logo from '../Assets/Logo.png';
import {View, Image, StyleSheet, Text } from 'react-native';

import Welcome from './WelcomeScreen';
import Events from '../Components/Events';
import Messages from './Messages';
import Profile from './Profile';
import MyEvents from './MyEvents';
import MySubEvent from './MySubEvents';
import Signup from './Signup';
import Login from './Login';
import Message from './Message'
import NewEvent from '../Components/NewEvents';
import NewSubEvent from '../Components/NewSubEvents';
import EventDetail from '../Components/EventDetails';
import Logout from '../Components/Logout';
//import CustomDrawer from './CustomeDrawerNav';

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  SafeAreaView,
  DrawerItems
} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';


class Navigation extends Component {
  render() {
    return <AppContainer />;
  }
}

const EventStack = createStackNavigator({
  Events: {
    screen: Events,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Events',
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
  },
  EventDetail: {
    screen: EventDetail
  },
  NewEvent: {
    screen: NewEvent
  },
  Logout: {
    screen: Logout
  }
}, {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  });

const MessageStack = createStackNavigator({
  Messages: {
    screen: Messages,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Messages',
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
  },
  Message: {
    screen: Message
  },
  NewEvent: {
    screen: NewEvent
  },
  Logout: {
    screen: Logout
  },
  NewSubEvent: {
    screen: NewSubEvent
  },
  MySubEvent: {
    screen: MySubEvent
  }
});

const MyEventStack = createStackNavigator({
  MyEvents: {
    screen: MyEvents,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'My Events',
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
  },
  EventDetail: {
    screen: EventDetail
  },
  NewEvent: {
    screen: NewEvent
  },
  Logout: {
    screen: Logout
  }
}, {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  })

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
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
  },
  NewEvent: {
    screen: NewEvent
  },
  Logout: {
    screen: Logout
  }
});

const DashboardTabNavigator = createBottomTabNavigator({
  Event: {
    screen: EventStack,
    navigationOptions: {
      tabBarLabel: "Event",
      tabBarIcon: ({ tintColor }) => (
        <IconAD
          style={{ paddingTop: 4 }}
          name="home"
          size={30}
          color={tintColor}
        />
      )
    }
  },
  Message: {
    screen: MessageStack,
    navigationOptions: {
      tabBarLabel: "Messages",
      tabBarIcon: ({ tintColor }) => (
        <IconAD
          style={{ paddingTop: 4 }}
          name="wechat"
          size={30}
          color={tintColor}
        />
      )
    }
  },
  MyEvents: {
    screen: MyEventStack,
    navigationOptions: {
      tabBarLabel: "My Events",
      tabBarIcon: ({ tintColor }) => (
        <IconAD
          style={{ paddingTop: 4 }}
          name="calendar"
          size={30}
          color={tintColor}
        />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <IconAD
          style={{ paddingTop: 4 }}
          name="user"
          size={30}
          color={tintColor}
        />
      )
    }
  },
}, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index]
      return {
        headerTitle: routeName
      }
    },
    tabBarOptions: {
      activeTintColor: "#4ABDAC",
      inactiveTintColor: "gray"
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

const CustomeDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1}}>
    <View style={styles.drawerView}>
      <Image source={Logo} style={styles.image}/>
    </View>
    <ScrollView style={styles.linkView}>
      <DrawerItems {...props} />
    </ScrollView>
    <View style={styles.footer}>
      
    </View>
  </SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  NewEvent: {
    screen: NewEvent,
    navigationOptions: () => ({
      title: `Create new event`,
    })
  },
  Logout: {
    screen: Logout,
    navigationOptions: () => ({
      title: `Logout`,
    })
  },
}, {
  contentComponent: CustomeDrawerComponent,
  contentOptions: {
    
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Dashboard: { screen: AppDrawerNavigator },
  NewEvent: { screen: NewEvent },

});

const AppContainer = createAppContainer(AppSwitchNavigator);

/*********************************Stylesheet Start*********************************/
const styles = StyleSheet.create({
  image:{
    width: '80%',
    height: 100,
    resizeMode: 'cover'
  }, drawerView:{
    height: 150,
    backgroundColor:'#4ABDAC',
    alignItems: 'center',
    justifyContent: 'center'
  }, linkView: {
      fontSize: 16
  }, footer:{
    margin: 20
  }
});
/*********************************Stylesheet End*********************************/

export default Navigation;