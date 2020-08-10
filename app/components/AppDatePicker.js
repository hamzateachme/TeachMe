import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Button,
  DatePickerIOS,
} from 'react-native';
import {useFormikContext} from 'formik';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppTextInput from './AppTextInput';
import colors from '../config/colors';
import vh from '../config/vh';
import vw from '../config/vw';

function AppDatePicker({icon, date, onValueChange, ...otherProps}) {
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (onValueChange) {
      onValueChange(currentDate);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={2.5 * vh}
              color={colors.secondary_variant}
            />
          )}
          <TextInput style={styles.text} editable={false} {...otherProps}>
            {date}
          </TextInput>
        </View>
      </TouchableWithoutFeedback>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={(date && new Date(date)) || new Date(Date.now())}
          mode={'date'}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 2 * vh,
    flexDirection: 'row',
    padding: 0.5 * vw,
    paddingLeft: 2 * vw,
    marginBottom: 0.5 * vh,
    alignItems: 'center',
  },
  text: {
    fontSize: 2.5 * vh,
    marginLeft: 2.5 * vw,
    width: '100%',
    height: '100%',
  },
});

export default AppDatePicker;
