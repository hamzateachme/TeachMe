import React, {useState, useContext} from 'react';
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
import {SocketContext} from '../hooks/SocketContext';
import {connect} from 'formik';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

function LoginScreen({navigation}) {
  [token, setToken] = useState();
  [loading, setLoading] = useState(false);
  const {connect} = useContext(SocketContext);
  //const {emit} = useContext(SocketContext);
  async function verify(values) {
    setLoading(true);
    var response = await login.authenticate({
      email: values.email,
      password: values.password,
    });
    if (response.ok) {
      setToken(response.data.token);
      response = await profileApi.getProfile(token);
      setLoading(false);
      if (response.ok) {
        //emit('registerUser', {_id: response.data._id});
        if (
          response.data.classes === undefined &&
          response.data.accountType === 'Teacher'
        ) {
          navigation.navigate('Classes', {...response.data, token: token});
        } else {
          connect({token: token, classes: response.data.classes});
          navigation.navigate('AppNavigator', {...response.data, token: token});
        }
      } else {
        alert('Network Error');
      }
    } else {
      setLoading(false);
      alert('something wrong');
      /**if (response.data.message) {
        alert(response.data.message); 
      } else {
        alert('Can not connect to server');
      }*/
    }
  }

  return (
    <Screen>
      <AppActivityIndicator visible={loading} />
      {!loading && (
        <View style={styles.container}>
          <Image
            source={require('../assets/TeachMe_Logo.jpg')}
            style={styles.logo}></Image>
          <AppForm
            initialValues={{email: '', password: ''}}
            onSubmit={(values) => verify(values)}
            validationSchema={validationSchema}>
            <>
              <AppFormField
                fieldName="email"
                icon="email"
                placeholder="Email"
                autoCapitalize="none"
                textContentType={'emailAddress'}
                keyboardType={'email-address'}
              />
              <AppFormField
                fieldName="password"
                icon="lock"
                placeholder="Password"
                autoCapitalize="none"
                textContentType={'password'}
                secureTextEntry={true}
              />
              <SubmitButton title={'LOGIN'} style={{marginTop: 10}} />
            </>
          </AppForm>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
  },
});

export default LoginScreen;
