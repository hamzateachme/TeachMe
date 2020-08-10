import React from 'react';
import {View, StyleSheet, LayoutAnimation} from 'react-native';
import {useFormikContext} from 'formik';

import ImagePickerField from './ImagePickerField';
import ErrorComponent from './ErrorComponent';
import AccountTypeSwitch from './AccountTypeSwitch';
import AppImagePicker from '../AppImagePicker';

import AppFormField from './AppFormField';
function AccountTypeField({fieldName, ...otherProps}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();

  function handleChange(switchEnabled) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (switchEnabled) {
      setFieldValue(fieldName, 'Teacher');
    } else {
      setFieldValue(fieldName, 'Student');
      setFieldValue('identityDoc', null);
    }
  }
  return (
    <>
      <AccountTypeSwitch
        accountType={values[fieldName]}
        onChange={handleChange}
        {...otherProps}
      />
      <ErrorComponent error={errors[fieldName]} visible={touched[fieldName]} />
      {values[fieldName] === 'Teacher' && (
        <View style={{width: '100%', flexDirection: 'row'}}>
          <ImagePickerField
            fieldName="identityDoc"
            icon="id-card"
            description="Identity Document"
            style={styles.imageField}
          />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  imageField: {
    flex: 1,
    margin: 5,
  },
});
export default AccountTypeField;
