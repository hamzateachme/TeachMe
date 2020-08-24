import React from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';
import vh from '../config/vh';
import {useNavigation} from '@react-navigation/native';
import ChatHistory from '../screens/ChatHistory';
import ChatScreen from '../screens/ChatScreen';
import vw from '../config/vw';

const Stack = createStackNavigator();

function HeaderButton() {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={async (props) => {
        navigation.navigate('History');
      }}>
      <MaterialCommunityIcons
        name="logout"
        size={4 * vh}
        color={colors.secondary_variant}
      />
    </TouchableWithoutFeedback>
  );
}

function ChatNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: colors.secondary_variant,
        headerTransparent: true,
        headerLeftContainerStyle: styles.headerLeftContainer,
        headerLeft: () => <HeaderButton />,
      }}>
      <Stack.Screen
        name="History"
        component={ChatHistory}
        options={{title: 'Chat History'}}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerLeftContainer: {
    paddingLeft: 5 * vw,
  },
});

export default ChatNavigator;
