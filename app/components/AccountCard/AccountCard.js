import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {SocketContext} from '../../hooks/SocketContext';
import UserContext from '../../hooks/UserContext';
import colors from '../../config/colors';
import vw from '../../config/vw';
import vh from '../../config/vh';
import CardButton from './CardButton';
import authStorage from '../../auth/storage';

function AccountCard() {
  const {user, setUser} = useContext(UserContext);
  const {emit} = useContext(SocketContext);
  const navigation = useNavigation();

  function walletPress() {
    if (user.accountType === 'Teacher') {
    } else {
    }
  }

  function teachPress() {
    if (user.accountType === 'Teacher') {
      emit('goOnline', {classes: user.classes});
    } else {
      navigation.navigate('Class');
    }
  }

  function logoutPress() {
    authStorage.removeUser();
    setUser(null);
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
          title={user.accountType === 'Teacher' ? 'Withdraw' : 'Deposit'}
        />
        <CardButton
          icon={'teach'}
          onPress={teachPress}
          title={user.accountType === 'Teacher' ? 'Teach' : 'Study'}
        />
        <CardButton icon={'logout'} onPress={logoutPress} title={'Logout'} />
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
