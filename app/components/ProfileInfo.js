import React, {useContext} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import colors from '../config/colors';
import UserContext from '../hooks/UserContext';
import vh from '../config/vh';
import vw from '../config/vw';

function ProfileInfo(props) {
  const {user} = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Image
        source={
          user.profile_picture
            ? {uri: user.profile_picture}
            : require('../assets/example_teacher.jpg')
        }
        style={styles.profile_picture}></Image>
      <View style={styles.text_container}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email} numberOfLines={1} ellipsizeMode={'tail'}>
          {props.status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1 * vh,
    overflow: 'hidden',
    borderRadius: 2 * vh,
  },

  email: {
    width: '100%',
    textAlignVertical: 'center',
    fontSize: 1.5 * vh,
    paddingLeft: 2.5 * vw,
    fontWeight: 'bold',
    color: colors.black,
  },

  name: {
    width: '100%',
    textAlignVertical: 'center',
    fontSize: 2 * vh,
    paddingLeft: 2.5 * vw,
    fontWeight: 'bold',
    color: colors.secondary_variant,
  },

  profile_picture: {
    width: 7 * vh,
    height: 7 * vh,
    borderRadius: (7 / 2) * vh,
  },

  text_container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfileInfo;
