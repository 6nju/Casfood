
import React, { Component } from 'react'
import { View, Alert } from 'react-native'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './redux/configureStore'
import messaging from '@react-native-firebase/messaging'
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
  this.requestUserPermission();
  this.checkApplicationPermission();
}

  
async requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission({
    sound: true,
    announcement: true,
    provisional: true,
    alert:true,
  });

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
}

async checkApplicationPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
  } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('User has provisional notification permissions.');
  } else {
    console.log('User has notification permissions disabled');
  }
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