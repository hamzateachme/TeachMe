import React from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import vw from '../config/vw';
import vh from '../config/vh';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

function SwipeRightView(props) {
  return (
    <View style={styles.swipe_right}>
      <MaterialCommunityIcons name={'trash-can'} color={'white'} size={25} />
    </View>
  );
}

function ChatItem(props) {
  return (
    <Swipeable renderRightActions={SwipeRightView}>
      <TouchableHighlight onPress={props.onPress}>
        <View style={styles.container}>
          <Image
            source={
              props.profile_picture
                ? {uri: props.profile_picture}
                : require('../assets/example_teacher.jpg')
            }
            style={styles.profile_picture}></Image>
          <View style={styles.text_container}>
            <Text style={styles.name}>{props.name}</Text>
            <Text
              style={styles.last_message}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {props.surname}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2.5 * vw,
    overflow: 'hidden',
  },

  last_message: {
    width: '100%',
    textAlignVertical: 'center',
    fontSize: 1.5 * vh,
    paddingLeft: 2.5 * vw,
    color: colors.black,
  },

  name: {
    width: '100%',
    textAlignVertical: 'center',
    fontSize: 2 * vh,
    paddingLeft: 2.5 * vw,
    fontWeight: 'bold',
    color: colors.secondary,
  },

  profile_picture: {
    width: 7 * vh,
    height: 7 * vh,
    borderRadius: (7 / 2) * vh,
  },

  swipe_right: {
    backgroundColor: colors.contrast,
    width: 18 * vw,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text_container: {
    flex: 1,
  },
});

export default ChatItem;
