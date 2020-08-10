import React, {useState, useContext, useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ChatText from '../components/ChatText';
import ListSeparator from '../components/ListSeparator';
import UserContext from '../hooks/UserContext';
import chatApi from '../api/chatApi';
import {SocketContext} from '../hooks/SocketContext';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  AccessoryBar,
} from 'react-native-gifted-chat';
import colors from '../config/colors';
import io from 'socket.io-client';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleEvent = props.socketData.handleEvent;
    this.removeListener = props.socketData.removeListener;
    this.emit = props.socketData.emit;
    this.receiver = props.receiver;
    this.token = props.token;
    this.conversationId = props.conversationId;
    this.state = {
      messages: [],
      image: '',
    };
  }

  async componentDidMount() {
    this.handleEvent('chat message', (msg) => {
      this.onReceive(msg);
    });

    const date = new Date();
    const response = await chatApi.getMessages(
      this.token,
      this.conversationId,
      date.toISOString(),
    );
    this.setState((previousState) => ({
      messages: GiftedChat.append(
        previousState.messages,
        response.data.messages.reverse(),
      ),
    }));
    //this.state.messages = conversation;
    //this.socket = io('http://192.168.18.2:3000');
    //this.socket.handleEvent('chat message', (msg) => {
    //  this.onReceive(msg);
    //});
  }

  componentWillUnmount() {
    console.log('Unmounting');
    this.removeListener('chat message');
  }

  configureListener(handleEvent) {
    handleEvent('chat message', (msg) => {
      this.onReceive(msg);
    });
  }
  onReceive(msg) {
    console.log(msg);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  onSend(messages = [], emitFnc) {
    if (this.state.image) {
      const messagesToUpload = messages.map((message) => ({
        ...message,
        to: this.receiver,
        conversationId: this.conversationId,
        image: this.state.image,
      }));
      //this.socket.emit('chat message', messagesToUpload[0]);
      emitFnc('chat message', messagesToUpload[0]);
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messagesToUpload),
        image: '',
      }));
    } else {
      const messagesToUpload = messages.map((message) => ({
        ...message,
        to: this.receiver,
        conversationId: this.conversationId,
      }));
      //this.socket.emit('chat message', messages[0]);
      emitFnc('chat message', messagesToUpload[0]);
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messagesToUpload),
      }));
    }
  }

  renderInputToolbar = (props) => {
    return <InputToolbar {...props} onPressActionButton={this.pickImage} />;
  };

  toggleImage = (image) => {
    this.setState({image: image});
  };

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.toggleImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  onChange = (imageUri) => {
    console.log(imageUri);
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.secondary,
          },
        }}
      />
    );
  }

  render() {
    return (
      <UserContext.Consumer>
        {(context) => (
          <View style={styles.container}>
            <GiftedChat
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages, this.emit)}
              user={{
                _id: context.params._id,
              }}
              loadEarlier={true}
              infiniteScroll={true}
              alwaysShowSend={true}
              renderBubble={this.renderBubble}
              renderInputToolbar={(messages) =>
                this.renderInputToolbar(messages)
              }
            />
          </View>
        )}
      </UserContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    flex: 1,
  },
});
export default Chat;