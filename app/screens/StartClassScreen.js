import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../config/colors';
import {useRoute} from '@react-navigation/native';

import {SocketContextProvider, SocketContext} from '../hooks/SocketContext';
import UserContext from '../hooks/UserContext';
import AppSwitch from '../components/AppSwitch';
import AppButton from '../components/AppButton';
import profileApi from '../api/profilesApi';
import Screen from '../components/Screen';
import vh from '../config/vh';
import vw from '../config/vw';

function StartClassScreen({navigation}) {
  const user = React.useContext(UserContext);
  const [classes, setClasses] = useState([]);
  const [connection, setConnection] = useState(false);
  const {socket, handleEvent, emit} = React.useContext(SocketContext);
  useEffect(() => {
    getClasses();
  }, []);

  async function getClasses() {
    const response = await profileApi.getClasses(user.params.token);
    if (response.ok) {
      setConnection(true);
      setClasses(response.data);
    } else {
      setConnection(false);
      alert('Could Not Connect To Server');
    }
  }

  async function onPress(classId) {
    emit('notify', {classId: classId, studentId: user.params._id});
    handleEvent('beginSession', function (msg) {
      console.log(msg.teacherId);
      navigation.navigate('Chats', {
        screen: 'Chat',
        params: {receiver: msg.teacherId, conversationId: msg.conversationId},
      });
    });
  }
  function handleChange(id, switchEnabled) {
    var newSelections = [...selectedClasses];
    if (switchEnabled) {
      newSelections.push(id);
    } else {
      newSelections = newSelections.filter((item) => {
        return item !== id;
      });
    }
    setSelectedClasses(newSelections);
  }
  return (
    <>
      {!connection && (
        <View>
          <Text> CONNECTION TO SERVER COULD NOT BE ESTABLISHED </Text>
        </View>
      )}
      {connection && (
        <ScrollView>
          <Screen>
            <Text style={[styles.text, {marginTop: 10, marginBottom: 10}]}>
              CHOOSE A SUBJECT
            </Text>
            <AppButton title={'SEE LEVEL DETAILS'} />
            {classes.map((cls) => {
              return (
                <TouchableWithoutFeedback
                  key={cls._id}
                  onPress={() => {
                    onPress(cls._id);
                  }}>
                  <View style={styles.box}>
                    <Text style={styles.text}>
                      {'Level: ' + cls.level + ', Subject: ' + cls.subject}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </Screen>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 2 * vh,
    overflow: 'hidden',
  },
  box: {
    width: '100%',
    height: 6 * vh,
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
    color: colors.secondary,
    marginLeft: 2.5 * vw,
    height: '100%',
    flex: 1,
    textAlignVertical: 'center',
  },
});

export default StartClassScreen;
