import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import vh from '../../config/vh';
import colors from '../../config/colors';

function CardButton({icon, onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={icon}
          size={3 * vh}
          color={colors.white}
        />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 7 * vh,
    width: 7 * vh,
    backgroundColor: colors.secondary_variant,
    borderRadius: 2 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textStyle: {
    color: colors.white,
    fontSize: 1.25 * vh,
  },
});

export default CardButton;
