import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInput, View, StyleSheet} from 'react-native';
import {Switch} from 'react-native';

import colors from '../../config/colors';
import vh from '../../config/vh';
import vw from '../../config/vw';

function AccountTypeSwitch({accountType, onChange, ...otherProps}) {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name={accountType === 'Teacher' ? 'chalkboard-teacher' : 'child'}
        size={20}
        color={colors.secondary_variant}
      />
      <TextInput style={styles.text} editable={false} {...otherProps}>
        {accountType}
      </TextInput>
      <Switch
        trackColor={{
          false: '#colors.primary',
          true: 'colors.secondary',
        }}
        thumbColor={colors.white}
        onValueChange={onChange}
        value={accountType === 'Teacher'}
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
    fontSize: 2.5 * vh,
    marginLeft: 2.5 * vw,
    height: '100%',
    flex: 1,
  },
});
export default AccountTypeSwitch;
