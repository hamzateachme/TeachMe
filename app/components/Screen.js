import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';
import vh from '../config/vh';

function Screen({style, children}) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2 * vh,
    padding: 2 * vh,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});

export default Screen;
