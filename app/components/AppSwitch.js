import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Switch} from 'react-native';

import colors from '../config/colors';
import vh from '../config/vh';
import vw from '../config/vw';

function AppSwitch({selected, onChange, textDescription, ...otherProps}) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.text} editable={false} {...otherProps}>
        {textDescription}
      </TextInput>
      <Switch
        trackColor={{
          false: '#colors.primary',
          true: 'colors.secondary',
        }}
        thumbColor={colors.white}
        onValueChange={onChange}
        value={selected}
      />
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
  text: {
    color: colors.black,
    fontSize: 2.5 * vh,
    marginLeft: 2.5 * vw,
    height: '100%',
    flex: 1,
  },
});
export default AppSwitch;
