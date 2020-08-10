import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  UIManager,
  ListView,
} from 'react-native';
import RegisterScreen from './app/screens/RegisterScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import TeacherCard from './app/components/TeacherCard';
import ChatItem from './app/components/ChatItem';
import ChatHistory from './app/screens/ChatHistory';
import colors from './app/config/colors';
import AppSwitch from './app/components/AppSwitch';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import GoalsCard from './app/components/GoalsCard';
import ProfileInfo from './app/components/ProfileInfo';
import TeacherHome from './app/screens/TeacherHome';
import AppNavigator from './app/navigation/AppNavigator';
import AccountCard from './app/components/AccountCard';
import ClassSelectionScreen from './app/screens/ClassSelectionScreen';
import StartClassScreen from './app/screens/StartClassScreen';
//import generate from './app/rsa';
import {create} from 'apisauce';
import {RSA, RSAKeychain} from 'react-native-rsa-native';

import login from './app/api/login';
import ChatScreen from './app/screens/ChatScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/** 
RSA.generateKeys(2048) // set key size
  .then((keys) => {
    console.log('1024 public:', keys.public); // the private key
    api.get('/teachme/').then((response) => {
      if (!response.ok) {
        console.log(response.problem);
      } else {
        RSA.encrypt('hamza.hussain97@live.com', response.data.key).then(
          (encodedMessage) => {
            handleE(encodedMessage);
          },
        );
        RSA.encrypt('hamza123', response.data.key).then((encodedMessage) => {
          handleP(encodedMessage);
        });
        api.post('/teachme/login', {
          email: window.encodedE,
          password: window.encodedP,
        });
      }
    });
  });*/

export default function App() {
  /**[serverKey, setServerKey] = useState();
  useEffect(() => {
    getServerKey();
  }, []);

  async function getServerKey() {
    var response = await login.getSecureKey();
    if (response.ok) {
      setServerKey(response.data.key);
    }
  }*/
  return (
    //<StartClassScreen />
    <NavigationContainer theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    width: '100%',
    flex: 1,
    backgroundColor: colors.primary,
  },
});
