import React, {useState, useContext, useEffect} from 'react';
import {View, ScrollView} from 'react-native';

import colors from '../config/colors';
import Screen from '../components/Screen';
import ProfileInfo from '../components/ProfileInfo';
import GoalsCard from '../components/GoalsCard';
import vh from '../config/vh';
import AccountCard from '../components/AccountCard';
import {SocketContext} from '../hooks/SocketContext';

function StudentHome() {
  const [status, setStatus] = useState('online');
  var {handleEvent} = useContext(SocketContext);
  useEffect(() => {
    handleEvent('setStatus', (msg) => {
      console.log(msg.status);
      setStatus(msg.status);
    });
  }, []);
  return (
    <ScrollView>
      <Screen>
        <ProfileInfo status={status} />
        <View style={{height: 2 * vh, backgroundColor: colors.primary}} />
        <GoalsCard type={'STUDENT'} />
        <AccountCard />
      </Screen>
    </ScrollView>
  );
}

export default StudentHome;
