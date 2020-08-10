import React from 'react';
import io from 'socket.io-client';

// Declaring the state object globally.
var query = {};
const initialSocketState = {
  socket: {},
};

const socketContextWrapper = (component) => ({
  ...initialSocketState,
  connect: (credentials) => {
    console.log(credentials);
    query = credentials;
    initialSocketState.socket = io('http://192.168.18.2:3002', {
      query: query,
    });
    initialSocketState.status = 'online';
    socketContextWrapper(component);
  },
  handleEvent: (event, fnc) => {
    initialSocketState.socket.on(event, fnc);
  },
  removeListener: (event) => {
    initialSocketState.socket.off(event);
  },
  emit: (event, data) => {
    initialSocketState.socket.emit(event, data);
  },
});

export const SocketContext = React.createContext({});

export class SocketContextProvider extends React.Component {
  state = {
    context: socketContextWrapper(this),
  };

  render() {
    return (
      <SocketContext.Provider value={this.state.context}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
