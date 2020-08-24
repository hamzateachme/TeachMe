import React, {useState, useContext, useEffect} from 'react';
import {Modal, View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Audio} from 'expo-av';

import AccountScreen from '../screens/AccountScreen';
import UserContext from '../hooks/UserContext';
import {SocketContext} from '../hooks/SocketContext';
import ChatNavigator from '../navigation/ChatNavigator';
import HomeNavigator from '../navigation/HomeNavigator';
import HomeButton from './HomeButton';
import vh from '../config/vh';
import colors from '../config/colors';
import {navigationRef} from './rootNavigation';
import OneSignal from 'react-native-onesignal';

const Tab = createBottomTabNavigator();

function AppModal({visible, setVisible, notification, user, sound}) {
  const navigation = navigationRef.current;
  const {handleEvent, emit} = useContext(SocketContext);
  if (sound && visible) {
    sound.playAsync();
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{notification.message}</Text>
          <TouchableHighlight
            style={{
              ...styles.openButton,
              backgroundColor: colors.secondary_variant,
            }}
            onPress={() => {
              sound.stopAsync();
              setVisible(!visible);
              handleEvent('beginSession', (msg) => {
                emit('goOffline', {});
                navigation.navigate('Chats', {
                  screen: 'Chat',
                  params: {
                    receiver: msg.studentId,
                    conversationId: msg.conversationId,
                  },
                });
              });
              emit('beginSession', {
                studentId: notification.studentId,
                teacherId: user,
                classId: notification.classId,
              });
            }}>
            <Text style={styles.textStyle}>Accept</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              ...styles.openButton,
              backgroundColor: colors.secondary_variant,
            }}
            onPress={() => {
              sound.stopAsync();
              setVisible(!visible);
              navigation.navigate('Home');
            }}>
            <Text style={styles.textStyle}>Decline</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

function AppNavigator(props) {
  const {user} = useContext(UserContext);
  [sound, setSound] = useState();
  [visible, setVisible] = useState(false);
  [notification, setNotification] = useState({
    message: '',
    studentId: '',
  });
  const {handleEvent, emit} = useContext(SocketContext);
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInBackgroundModeIOS: true,
      playsInBackgroundModeAndroid: true,
    });
    loadSound();
    handleEvent('disconnect', () => {
      console.log('Disconnected');
    });
    if (user.accountType === 'Teacher') {
      handleEvent('notification', notificationHandler);
      handleEvent('studentAssigned', (msg) => {
        setVisible(false);
      });

      OneSignal.addEventListener('opened', onOpened);
    }
  }, []);

  function onOpened(openResult) {
    const navigation = navigationRef.current;
    console.log('Data: ', openResult.notification.payload.additionalData);
    notification = openResult.notification.payload.additionalData;
    handleEvent('beginSession', (msg) => {
      emit('goOffline', {});
      navigation.navigate('Chats', {
        screen: 'Chat',
        params: {
          receiver: msg.studentId,
          conversationId: msg.conversationId,
        },
      });
    });
    console.log(user._id);
    emit('beginSession', {
      studentId: notification.studentId,
      teacherId: user._id,
      classId: notification.classId,
    });
  }

  function notificationHandler(msg) {
    console.log(msg.studentId);
    if (!visible) {
      console.log('I am here');
      setNotification(msg);
      setVisible(true);
    }
  }
  async function loadSound() {
    try {
      const {sound: soundObject} = await Audio.Sound.createAsync(
        require('../assets/sounds/piece-of-cake.mp3'),
        {
          isLooping: true,
        },
      );

      setSound(soundObject);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          style: {height: 7 * vh, paddingBottom: 0.5 * vh},
        }}
        animationEnabled={true}>
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={({navigation}) => ({
            tabBarButton: () => (
              <HomeButton
                onPress={() =>
                  navigation.navigate('Home', {screen: 'Dashboard'})
                }
              />
            ),
          })}
        />
        <Tab.Screen
          name="Chats"
          component={ChatNavigator}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <AppModal
        visible={visible}
        sound={sound}
        setVisible={setVisible}
        notification={notification}
        user={user._id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AppNavigator;
/** 
<Tab.Screen
          name="Chats"
          component={ChatNavigator}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />*/
//{() => navigation.navigate('Home')}
