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
import {SocketContextProvider} from '../hooks/SocketContext';
import ClassSelectionScreen from '../screens/ClassSelectionScreen';
import vw from '../config/vw';
const Stack = createStackNavigator();

function HeaderButton() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={(props) => navigation.dispatch(StackActions.popToTop())}>
      <MaterialCommunityIcons
        name="logout"
        size={4 * vh}
        color={colors.secondary_variant}
      />
    </TouchableWithoutFeedback>
  );
}

function AuthNavigator() {
  return (
    <SocketContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.secondary_variant,
          headerTransparent: true,
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Classes"
          component={ClassSelectionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppNavigator"
          component={AppNavigator}
          options={{
            title: 'LOGOUT',
            headerLeftContainerStyle: {paddingLeft: 5 * vw},
            headerLeft: () => <HeaderButton />,
          }}
        />
      </Stack.Navigator>
    </SocketContextProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});

export default AuthNavigator;
