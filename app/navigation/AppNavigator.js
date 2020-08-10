import React, {useState, useContext, useEffect} from 'react';
import {Modal, View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Audio} from 'expo-av';

import AccountScreen from '../screens/AccountScreen';
import TeacherHome from '../screens/TeacherHome';
import StudentHome from '../screens/StudentHome';
import ChatHistory from '../screens/ChatHistory';
import {useRoute, useNavigation} from '@react-navigation/native';
import UserContext, {UserProvider} from '../hooks/UserContext';
import {SocketContextProvider, SocketContext} from '../hooks/SocketContext';
import ChatNavigator from '../navigation/ChatNavigator';
import HomeNavigator from '../navigation/HomeNavigator';
import HomeButton from './HomeButton';
import vh from '../config/vh';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

function AppModal({visible, setVisible, notification, user, sound}) {
  const navigation = useNavigation();
  const {handleEvent, emit} = useContext(SocketContext);
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
  const route = useRoute();
  [sound, setSound] = useState();
  [visible, setVisible] = useState(false);
  [notification, setNotification] = useState({
    message: '',
    studentId: '',
  });
  const {handleEvent} = useContext(SocketContext);
  useEffect(() => {
    //console.log(route.params);
    loadSound();
    handleEvent('disconnect', () => {
      console.log('Disconnected');
    });
    if (route.params.accountType === 'Teacher') {
      handleEvent('notification', notificationHandler);
      handleEvent('studentAssigned', (msg) => {
        setVisible(false);
      });
    }
  }, []);

  function notificationHandler(msg) {
    console.log(msg.studentId);
    sound.playAsync();
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
    <UserProvider value={route}>
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
              <HomeButton onPress={() => navigation.navigate('Home')} />
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
        user={route.params._id}
      />
    </UserProvider>
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
