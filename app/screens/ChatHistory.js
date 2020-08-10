import React, {useEffect, useState} from 'react';

import colors from '../config/colors';
import {FlatList, StyleSheet, View} from 'react-native';

import chatApi from '../api/chatApi';
import profilesApi from '../api/profilesApi';
import ChatItem from '../components/ChatItem';
import ListSeparator from '../components/ListSeparator';
import Screen from '../components/Screen';
import vh from '../config/vh';
import UserContext from '../hooks/UserContext';

const messages = [
  {
    id: 1,
    name: 'Hamza Hussain',
    last_message: "Hello. What's up?",
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 2,
    name: 'Tom',
    last_message:
      'Ofh Ofh Ofh Ofh. Here is a very long message that no one will readdddddddddddddddddddddddddddddddddddddddd.',
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 3,
    name: 'Dick',
    last_message: "Let's have a meeting today.",
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 4,
    name: 'Harry',
    last_message: 'abcdefghijklmnopqrstuvwxyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 5,
    name: 'Hamza Hussain',
    last_message: "Hello. What's up?",
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 6,
    name: 'Tom',
    last_message:
      'Ofh Ofh Ofh Ofh. Here is a very long message that no one will readdddddddddddddddddddddddddddddddddddd.',
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 7,
    name: 'Dick',
    last_message: "Let's have a meeting today.",
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 8,
    name: 'Harry',
    last_message: 'abcdefghijklmnopqrstuvwxyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 9,
    name: 'Hamza Hussain',
    last_message: "Hello. What's up?",
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 10,
    name: 'Tom',
    last_message:
      'Ofh Ofh Ofh Ofh. Here is a very long message that no one will read. But I am a nitwit so, I will write a long message.',
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 11,
    name: 'Dick',
    last_message: "Let's have a meeting today.",
    profile_picture: require('../assets/example_teacher.jpg'),
  },
  {
    id: 12,
    name: 'Harry',
    last_message: 'abcdefghijklmnopqrstuvwxyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    profile_picture: require('../assets/example_teacher.jpg'),
  },
];
function ChatHistory({navigation}) {
  const user = React.useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getProfileConversations();
  }, []);

  async function getProfileConversations() {
    var response = await chatApi.getProfileConversations(user.params.token);
    const conversations = response.data.conversations;
    var ids = [];
    if (user.params.accountType === 'Teacher') {
      for (i = 0; i < conversations.length; i++) {
        ids = ids.concat([conversations[i].student_id]);
      }
    } else {
      for (i = 0; i < conversations.length; i++) {
        ids = ids.concat([conversations[i].teacher_id]);
      }
    }
    console.log(ids);
    response = await profilesApi.getConversationProfiles(
      user.params.token,
      ids,
    );
    console.log(response.data);
    setConversations(response.data);
  }

  async function onPress(id) {
    var teacher_id = '';
    var student_id = '';
    if (user.params.accountType === 'Teacher') {
      teacher_id = user.params._id;
      student_id = id;
    } else {
      teacher_id = id;
      student_id = user.params._id;
    }
    const response = await chatApi.getConversation(
      user.params.token,
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
    width: '100%',
    borderRadius: 2 * vh,
    overflow: 'hidden',
  },
});

export default ChatHistory;
