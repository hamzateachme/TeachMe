import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import TeacherHome from '../screens/TeacherHome';
import StudentHome from '../screens/StudentHome';
import colors from '../config/colors';
import StartClassScreen from '../screens/StartClassScreen';
import UserContext from '../hooks/UserContext';

const Stack = createStackNavigator();

function HomeNavigator() {
  const user = useContext(UserContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colors.secondary_variant,
        headerTransparent: true,
        headerShown: false,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={user.accountType === 'Student' ? StudentHome : TeacherHome}
      />
      <Stack.Screen name="Class" component={StartClassScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
});

export default HomeNavigator;
