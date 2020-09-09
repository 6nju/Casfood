
import React, { Component } from 'react'
import { View, Alert } from 'react-native'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './redux/configureStore'
const { persistor, store } = configureStore()

import RouterComponent from './route'

import { AsyncStorage } from 'react-native'; 

import firebase from '@react-native-firebase/app';


class App extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
async componentDidMount() {

   
    this.checkPermission();
    this.createNotificationListeners();
  };

  async checkPermission() {

    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      this.getToken();
    }
    else {
      this.requestPermission();
    }
  }
  //Step 2: if not has permission -> process request
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
	  a
      console.log('quyền bị từ chối');
    }
  }
  //Step 3: if has permission -> process get Token
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (fcmToken == null) {
			
      fcmToken = await firebase.messaging().getToken();
	  
      console.log('token = ', fcmToken);
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //For Listenning Notification
  async createNotificationListeners() {

    //Tạo channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
      console.log('my chanel id = ', channel);
    firebase.notifications().android.createChannel(channel);

    //Vietnamese explain: khi đang ở foreground => show alert khi có noti
    this.notificationListener = firebase.notifications().onNotification((noti) => {
      const { title, body } = noti;
      Alert.alert(title, body);
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<View />}
          persistor={persistor}>
          <RouterComponent store={store} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App