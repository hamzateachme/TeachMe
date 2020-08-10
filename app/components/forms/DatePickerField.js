import React from 'react';
import {useFormikContext} from 'formik';
import {View} from 'react-native';
import AppDatePicker from '../AppDatePicker';
import ErrorComponent from './ErrorComponent';

function DatePickerField({fieldName, ...otherProps}) {
  const {setFieldValue, errors, touched, values} = useFormikContext();
  return (
    <>
      <AppDatePicker
        date={values[fieldName] && values[fieldName].toDateString()}
        onValueChange={(date) => setFieldValue(fieldName, date)}
        {...otherProps}
      />
      <ErrorComponent error={errors[fieldName]} visible={touched[fieldName]} />
    </>
  );
}

export default DatePickerField;
