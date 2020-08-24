import React from 'react';
import Chat from '../components/Chat';
import {SocketContext} from '../hooks/SocketContext';
import UserContext from '../hooks/UserContext';

function ChatScreen({route}) {
  const {user} = React.useContext(UserContext);
  const {socket, handleEvent, removeListener, emit} = React.useContext(
    SocketContext,
  );
  return (
    <Chat
      socketData={{
        socket: socket,
        handleEvent: handleEvent,
        removeListener: removeListener,
        emit: emit,
      }}
      token={user.token}
      receiver={route.params.receiver}
      conversationId={route.params.conversationId}></Chat>
  );
}
export default ChatScreen;
