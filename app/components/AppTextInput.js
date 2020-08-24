import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, TextInput} from 'react-native';

import colors from '../config/colors';
import vh from '../config/vh';
import vw from '../config/vw';

function AppTextInput({icon, ...otherProps}) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={2.5 * vh}
          color={colors.secondary_variant}
        />
      )}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
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
  textInput: {
    fontSize: 2.5 * vh,
    marginLeft: 2.5 * vw,
    width: '100%',
    height: '100%',
  },
});

export default AppTextInput;
