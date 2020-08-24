import React, {useContext} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';

function WelcomeScreen({navigation}) {
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
