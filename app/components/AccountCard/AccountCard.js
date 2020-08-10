import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SocketContext} from '../../hooks/SocketContext';
import UserContext from '../../hooks/UserContext';
import colors from '../../config/colors';
import vw from '../../config/vw';
import vh from '../../config/vh';
import CardButton from './CardButton';
import {useNavigation} from '@react-navigation/native';
function AccountCard() {
  const user = useContext(UserContext);
  const {emit} = useContext(SocketContext);
  const navigation = useNavigation();

  function walletPress() {
    if (user.params.accountType === 'Teacher') {
    } else {
    }
  }

  function teachPress() {
    if (user.params.accountType === 'Teacher') {
      emit('goOnline', {classes: user.params.classes});
    } else {
      navigation.navigate('Class');
    }
  }

  function historyPress() {
    if (user.params.accountType === 'Teacher') {
    } else {
    }
  }

  function helpPress() {}

  return (
    <View style={styles.container}>
      <View style={styles.wallet_container}>
        <Text style={styles.textStyle}>WALLET BALANCE</Text>
        <MaterialCommunityIcons
          name="wallet"
          color={colors.secondary_variant}
          size={6 * vh}
        />
        <Text style={styles.textStyle}>USD 0</Text>
      </View>
      <View style={styles.border_view} />
      <View style={styles.buttonsContainer}>
        <CardButton
          icon={'wallet'}
          title={user.params.accountType === 'Teacher' ? 'Withdraw' : 'Deposit'}
        />
        <CardButton
          icon={'teach'}
          onPress={teachPress}
          title={user.params.accountType === 'Teacher' ? 'Teach' : 'Study'}
        />
        <CardButton icon={'history'} title={'History'} />
        <CardButton icon={'help-box'} title={'Help'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 2 * vh,
    padding: 2.5 * vw,
    overflow: 'hidden',
  },

  border_view: {
    backgroundColor: colors.primary_dark,
    margin: 2 * vh,
    height: 0.25 * vh,
  },

  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 2.5 * vw,
    paddingLeft: 4 * vw,
  },

  wallet_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 2.5 * vw,
    width: '100%',
    alignItems: 'center',
  },

  textStyle: {
    textAlignVertical: 'center',
    fontSize: 2.25 * vh,
    paddingLeft: 2.5 * vw,
    paddingRight: 5 * vw,
    color: colors.secondary_variant,
  },
});

export default AccountCard;
