import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import vh from '../../config/vh';
import colors from '../../config/colors';
import vw from '../../config/vw';

function CardButton({icon, onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={icon}
          size={3 * vh}
          color={colors.white}
        />
        <Text style={{color: colors.white, fontSize: 1.25 * vh}}>{title}</Text>
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
});

export default CardButton;
