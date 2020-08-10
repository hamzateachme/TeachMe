import React, {useEffect} from 'react';
import Chat from '../components/Chat';
import {SocketContext} from '../hooks/SocketContext';
import {useRoute} from '@react-navigation/native';
import UserContext from '../hooks/UserContext';
import AppButton from '../components/AppButton';
import {useKeepAwake} from 'expo-keep-awake';

function ChatScreen({route}) {
  const user = React.useContext(UserContext);
  const {socket, handleEvent, removeListener, emit} = React.useContext(
    SocketContext,
  );
  useKeepAwake();
  return (
    <Chat
      socketData={{
        socket: socket,
        handleEvent: handleEvent,
        removeListener: removeListener,
        emit: emit,
      }}
      token={user.params.token}
      receiver={route.params.receiver}
      conversationId={route.params.conversationId}></Chat>
  );
}
export default ChatScreen;
