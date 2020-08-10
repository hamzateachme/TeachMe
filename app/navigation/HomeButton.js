import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableOpacity} from 'react-native';
import vh from '../config/vh';
import vw from '../config/vw';

function HomeButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="home"
          color={colors.white}
          size={3 * vh}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary_variant,
    height: 8 * vh,
    width: 8 * vh,
    bottom: 1.5 * vh,
    borderRadius: (8 / 2) * vh,
    borderColor: colors.white,
    borderWidth: 0.5 * vh,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeButton;
