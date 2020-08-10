import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from 'yup';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppTextInput from '../components/AppTextInput';
import AppDatePicker from '../components/AppDatePicker';
import DatePickerField from '../components/forms/DatePickerField';
import ImagePickerField from '../components/forms/ImagePickerField';
import SubmitButton from '../components/forms/SubmitButton';
import colors from '../config/colors';
import {Switch} from 'react-native-gesture-handler';
import AccountTypeField from '../components/forms/AccountTypeField';
import Screen from '../components/Screen';
import vw from '../config/vw';
import vh from '../config/vh';
import login from '../api/login';
import profileApi from '../api/profilesApi';
import AppActivityIndicator from '../components/AppActivityIndicator';
import ImgToBase64 from 'react-native-image-base64';

import {useRoute} from '@react-navigation/native';
import {RSA, RSAKeychain} from 'react-native-rsa-native';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  profile_picture: Yup.mixed().nullable().required().label('Profile Picture'),
  name: Yup.string().required().label('Name'),
  surname: Yup.string().required().min(6).label('Surname'),
  dateOfBirth: Yup.date().required().label('Date of Birth'),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid')
    .label('Phone Number'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  accountType: Yup.string().required().label('Account Type'),
  identityDoc: Yup.mixed()
    .nullable()
    .when('accountType', {
      is: 'Teacher',
      then: Yup.mixed()
        .nullable()
        .required('Identity Document is required for Teacher Account Type.'),
      otherwise: Yup.mixed().notRequired(),
    }),
});

function RegisterScreen({navigation}) {
  [token, setToken] = useState();
  [loading, setLoading] = useState(false);

  async function register(values) {
    setLoading(true);
    profile_picture = await ImgToBase64.getBase64String(values.profile_picture);
    if (values.identityDoc) {
      identityDoc = await ImgToBase64.getBase64String(values.identityDoc);
    } else {
      identityDoc = values.identityDoc;
    }
    var response = await login.register({
      profile_picture: profile_picture,
      name: values.name,
      surname: values.surname,
      dateOfBirth: values.dateOfBirth.toISOString(),
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      accountType: values.accountType,
      identityDoc: identityDoc,
    });
    if (response.ok) {
      setToken(response.data.token);
      response = await profileApi.getProfile(token);
      setLoading(false);
      if (response.ok) {
        if (response.data.accountType === 'Teacher') {
          navigation.navigate('Classes', {...response.data, token: token});
        } else {
          navigation.navigate('Home', {...response.data, token: token});
        }
      } else {
        alert(response.problem);
      }
    } else {
      setLoading(false);
      alert(response.problem);
    }
  }

  return (
    <>
      <AppActivityIndicator visible={loading} />
      {!loading && (
        <ScrollView>
          <Screen>
            <AppActivityIndicator visible={loading} />
            <View style={styles.container}>
              <AppForm
                initialValues={{
                  profile_picture: null,
                  name: '',
                  surname: '',
                  dateOfBirth: '',
                  phoneNumber: '',
                  email: '',
                  password: '',
                  accountType: '',
                  identityDoc: null,
                }}
                onSubmit={(values) => register(values)}
                validationSchema={validationSchema}>
                <>
                  <ImagePickerField
                    fieldName="profile_picture"
                    icon="camera"
                    description="Profile Picture"
                  />
                  <AppFormField
                    fieldName="name"
                    icon="account"
                    placeholder="Name"
                    autoCapitalize="words"
                    textContentType={'givenName'}
                  />
                  <AppFormField
                    fieldName="surname"
                    icon="account"
                    placeholder="Surname"
                    autoCapitalize="words"
                    textContentType={'familyName'}
                  />
                  <DatePickerField
                    fieldName="dateOfBirth"
                    icon="calendar"
                    placeholder="Date of Birth"
                  />
                  <AppFormField
                    fieldName="phoneNumber"
                    icon="cellphone"
                    placeholder="(999) 9999999"
                    textContentType={'telephoneNumber'}
                    keyboardType={'number-pad'}
                  />
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
                  <AccountTypeField
                    fieldName="accountType"
                    placeholder="Account Type"
                  />
                  <SubmitButton title={'REGISTER'} style={{marginTop: 10}} />
                </>
              </AppForm>
            </View>
          </Screen>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.primary,
  },
});
export default RegisterScreen;
