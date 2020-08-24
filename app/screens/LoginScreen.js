import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import * as Yup from 'yup';

import colors from '../config/colors';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import AppActivityIndicator from '../components/AppActivityIndicator';
import {SocketContext} from '../hooks/SocketContext';
import authentication from '../auth/authentication';
import UserContext from '../hooks/UserContext';
import authStorage from '../auth/storage';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

function LoginScreen({navigation}) {
  [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext);
  const {connect} = useContext(SocketContext);

  async function verify(values) {
    setLoading(true);
    response = await authentication.authenticate(values.email, values.password);
    if (response.profile) {
      await authStorage.storeUser(response.profile);
      connect({
        token: response.profile.token,
        classes: response.profile.classes,
      });
      setLoading(false);
      if (
        response.profile.classes === undefined &&
        response.profile.accountType === 'Teacher'
      ) {
        navigation.navigate('Classes');
      } else {
        setUser(response.profile);
      }
    } else {
      alert(response);
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
