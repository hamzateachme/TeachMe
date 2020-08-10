import React, {useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as Yup from 'yup';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import DatePickerField from '../components/forms/DatePickerField';
import ImagePickerField from '../components/forms/ImagePickerField';
import SubmitButton from '../components/forms/SubmitButton';
import colors from '../config/colors';
import Screen from '../components/Screen';
import UserContext from '../hooks/UserContext';
import ProfileInfo from '../components/ProfileInfo';
import vw from '../config/vw';
import vh from '../config/vh';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  profile_picture: Yup.mixed().nullable().required().label('Profile Picture'),
  dateOfBirth: Yup.date().required().label('Date of Birth'),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid')
    .label('Phone Number'),
  password: Yup.string().required().min(6).label('Password'),
});

function AccountScreen() {
  const user = useContext(UserContext);
  return (
    <ScrollView>
      <Screen>
        <View style={styles.container}>
          <AppForm
            initialValues={{
              profile_picture: user.params.profile_picture,
              dateOfBirth: user.params.dataOfBirth,
              phoneNumber: user.params.phoneNumber,
              email: '',
              password: '',
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}>
            <>
              <ImagePickerField
                fieldName="profile_picture"
                icon="camera"
                description="Profile Picture"
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
                fieldName="password"
                icon="lock"
                placeholder="Password"
                autoCapitalize="none"
                textContentType={'password'}
                secureTextEntry={true}
              />
              <SubmitButton title={'UPDATE'} style={{marginTop: 10}} />
            </>
          </AppForm>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.primary,
  },
});
export default AccountScreen;
