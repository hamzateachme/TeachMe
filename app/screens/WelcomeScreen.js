import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import * as Yup from 'yup';
import {RSA, RSAKeychain} from 'react-native-rsa-native';
import jwtDecode from 'jwt-decode';

import colors from '../config/colors';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppButton from '../components/AppButton';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import login from '../api/login';
import profileApi from '../api/profilesApi';
import AppActivityIndicator from '../components/AppActivityIndicator';
import vw from '../config/vw';
import vh from '../config/vh';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

function WelcomeScreen({navigation}) {
  //let keyTag = 'com.teachme.private';
  const demoUser = {
    _id: 100,
    name: 'Hamza',
    surname: 'Hussain',
    phone: 5414946319,
    profile_picture: '',
    status: 'bronze',
    rating: 3,
  };
  async function getServerKey() {
    var response = await login.getSecureKey();
    if (response.ok) {
      encryption.setServerKey(response.data.key);
      return response.data.key;
    } else {
      return null;
    }
  }

  async function signup() {
    navigation.navigate('Register');
  }

  async function login() {
    navigation.navigate('Login');
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          source={require('../assets/TeachMe_Logo.jpg')}
          style={styles.logo}></Image>
        <View style={styles.button_container}>
          <AppButton
            title={'LOGIN'}
            onPress={login}
            style={styles.loginButton}
          />
          <AppButton
            title={'SIGNUP'}
            onPress={signup}
            style={styles.signupButton}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
    backgroundColor: colors.primary,
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    flex: 4,
  },
  loginButton: {
    backgroundColor: colors.contrast,
  },
  signupButton: {
    backgroundColor: colors.secondary,
  },
});

export default WelcomeScreen;
