import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";

import AppTextInput from "../AppTextInput";
import ErrorComponent from "./ErrorComponent";
function AppFormField({ fieldName, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(fieldName)}
        onChangeText={handleChange(fieldName)}
        {...otherProps}
      />
      <ErrorComponent error={errors[fieldName]} visible={touched[fieldName]} />
    </>
  );
}

export default AppFormField;
