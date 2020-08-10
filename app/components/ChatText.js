import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ChatText({message, alignment}) {
  return (
    <View style={[styles.container, {justifyContent: alignment}]}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatText;
