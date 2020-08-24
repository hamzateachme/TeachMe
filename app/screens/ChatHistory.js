import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import chatApi from '../api/chatApi';
import profilesApi from '../api/profilesApi';
import ChatItem from '../components/ChatItem';
import ListSeparator from '../components/ListSeparator';
import Screen from '../components/Screen';
import vh from '../config/vh';
import UserContext from '../hooks/UserContext';

function ChatHistory({navigation}) {
  const {user} = React.useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getProfileConversations();
  }, []);

  async function getProfileConversations() {
    var response = await chatApi.getProfileConversations(user.token);
    const conversations = response.data.conversations;
    var ids = [];
    if (user.accountType === 'Teacher') {
      for (i = 0; i < conversations.length; i++) {
        ids = ids.concat([conversations[i].student_id]);
      }
    } else {
      for (i = 0; i < conversations.length; i++) {
        ids = ids.concat([conversations[i].teacher_id]);
      }
    }
    console.log(ids);
    response = await profilesApi.getConversationProfiles(user.token, ids);
    console.log(response.data);
    setConversations(response.data);
  }

  async function onPress(id) {
    var teacher_id = '';
    var student_id = '';
    if (user.accountType === 'Teacher') {
      teacher_id = user._id;
      student_id = id;
    } else {
      teacher_id = id;
      student_id = user._id;
    }
    const response = await chatApi.getConversation(
      user.token,
      teacher_id,
      student_id,
    );
    console.log('Pressed');
    console.log(response.data.conversation);

    navigation.navigate('Chat', {
      receiver: id,
      conversationId: response.data.conversation,
    });
  }

  return (
    <Screen style={{justifyContent: 'flex-start'}}>
      <View style={styles.container}>
        <FlatList
          data={conversations}
          keyExtractor={(profile) => profile._id}
          renderItem={({item}) => (
            <ChatItem
              name={item.name}
              surname={item.surname}
              profile_picture={item.profile_picture}
              onPress={() => {
                onPress(item._id);
              }}
            />
          )}
          ItemSeparatorComponent={ListSeparator}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3 * vh,
    width: '100%',
    borderRadius: 2 * vh,
    overflow: 'hidden',
  },
});

export default ChatHistory;
