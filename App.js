import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import io from 'socket.io-client';
import OneSignal from 'react-native-onesignal';

import colors from './app/config/colors';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import authStorage from './app/auth/storage';
import AppNavigator from './app/navigation/AppNavigator';
import {
  setInitialState,
  SocketContextProvider,
} from './app/hooks/SocketContext';
import {UserProvider} from './app/hooks/UserContext';
import {navigationRef} from './app/navigation/rootNavigation';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  [user, setUser] = useState();
  [loading, setLoading] = useState(true);

  async function restoreUser() {
    const user = await authStorage.getUser();
    console.log(user);
    if (!user) {
      setLoading(false);
      return;
    }
    setInitialState(
      io('http://192.168.18.2:3002', {
        query: {token: user.token, classes: user.classes},
      }),
    );
    setUser(user);
    setLoading(false);
  }

  useEffect(() => {
    restoreUser();
    OneSignal.init('8a316945-1973-4a08-9dab-7d0e162b15bb', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(1);
  }, []);

  return (
    <UserProvider value={{user, setUser}}>
      {loading ? (
        <View
          style={{width: '100%', height: '100%', backgroundColor: colors.black}}
        />
      ) : (
        <SocketContextProvider>
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </SocketContextProvider>
      )}
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    width: '100%',
    flex: 1,
    backgroundColor: colors.primary,
  },
});
