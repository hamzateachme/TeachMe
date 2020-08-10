import React, {useContext} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import TeacherHome from '../screens/TeacherHome';
import StudentHome from '../screens/StudentHome';
import colors from '../config/colors';
import {Screen} from '../components/Screen';
import AppNavigator from '../navigation/AppNavigator';
import vh from '../config/vh';
import {StackActions, useNavigation} from '@react-navigation/native';
import ChatHistory from '../screens/ChatHistory';
import ChatScreen from '../screens/ChatScreen';
import StartClassScreen from '../screens/StartClassScreen';
import {SocketContext} from '../hooks/SocketContext';
import UserContext from '../hooks/UserContext';
import vw from '../config/vw';
const Stack = createStackNavigator();

function HomeNavigator() {
  const user = useContext(UserContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.secondary_variant,
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={
          user.params.accountType === 'Student' ? StudentHome : TeacherHome
        }
      />
      <Stack.Screen name="Class" component={StartClassScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});

export default HomeNavigator;
