import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import colors from '../config/colors';
import vh from '../config/vh';
import vw from '../config/vw';

function AppButton({title, onPress, style}) {
  return (
    <TouchableOpacity
      style={[styles.button_container, style]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: '100%',
    backgroundColor: colors.contrast,
    borderRadius: 2 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2.5 * vw,
    marginBottom: 0.5 * vh,
  },

  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 2.5 * vh,
    fontWeight: 'bold',
    width: '100%',
  },
});

export default AppButton;
