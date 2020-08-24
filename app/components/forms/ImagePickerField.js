import React from 'react';
import {useFormikContext} from 'formik';
import {View} from 'react-native';
import AppImagePicker from '../AppImagePicker';
import ErrorComponent from './ErrorComponent';

function ImagePickerField({fieldName, icon, ...otherProps}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();
  function handleChange(imageUri) {
    setFieldValue(fieldName, imageUri);
  }
  return (
    <View style={{flex: 1}}>
      <AppImagePicker
        imageUri={values[fieldName]}
        icon={icon}
        onChange={handleChange}
        {...otherProps}
      />
      <ErrorComponent error={errors[fieldName]} visible={touched[fieldName]} />
    </View>
  );
}

export default ImagePickerField;
