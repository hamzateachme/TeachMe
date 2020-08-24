import React, {useState, useEffect, useContext} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';

import AppSwitch from '../components/AppSwitch';
import AppButton from '../components/AppButton';
import profileApi from '../api/profilesApi';
import Screen from '../components/Screen';
import colors from '../config/colors';
import vh from '../config/vh';
import vw from '../config/vw';
import {SocketContext} from '../hooks/SocketContext';
import UserContext from '../hooks/UserContext';

function ClassSelectionScreen({navigation}) {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const {user, setUser} = useContext(UserContext);
  const {connect} = useContext(SocketContext);
  useEffect(() => {
    getClasses();
  }, []);

  async function getClasses() {
    const response = await profileApi.getClasses(user.token);
    setClasses(response.data);
  }

  async function onPress() {
    const response = await profileApi.setClasses(user.token, selectedClasses);
    connect({token: user.token, classes: selectedClasses});
    setUser({...user, classes: selectedClasses});
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
    <ScrollView>
      <Screen>
        <View style={styles.container}>
          <Text style={[styles.text, {marginTop: 10, marginBottom: 10}]}>
            CHOOSE CLASSES
          </Text>
          {classes.map((cls) => {
            const id = cls._id;
            return (
              <AppSwitch
                key={cls._id}
                selected={selectedClasses.includes(id)}
                onChange={(switchEnabled) => {
                  console.log('here');
                  handleChange(id, switchEnabled);
                }}
                textDescription={
                  'Level: ' + cls.level + ' Subject: ' + cls.subject
                }
              />
            );
          })}
          <AppButton title={'SUBMIT'} onPress={onPress} />
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 2 * vh,
    overflow: 'hidden',
  },
  text: {
    fontSize: 2.5 * vh,
    color: colors.secondary,
    marginLeft: 2.5 * vw,
    height: '100%',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ClassSelectionScreen;
