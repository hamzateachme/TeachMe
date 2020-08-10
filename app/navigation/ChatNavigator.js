import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import TeacherHome from '../screens/TeacherHome';
import colors from '../config/colors';
import {Screen} from '../components/Screen';
import AppNavigator from '../navigation/AppNavigator';
import vh from '../config/vh';
import {StackActions, useNavigation} from '@react-navigation/native';
import ChatHistory from '../screens/ChatHistory';
import ChatScreen from '../screens/ChatScreen';
import {SocketContext} from '../hooks/SocketContext';
const Stack = createStackNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.secondary_variant,
        headerTransparent: true,
      }}>
      <Stack.Screen
        name="History"
        component={ChatHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});

export default ChatNavigator;
