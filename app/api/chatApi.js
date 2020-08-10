import servers from './apiServers';

function getMessages(token, conversationId, lastDate) {
  return servers.chatServer.get('/teachme/messages', {
    token: token,
    conversationId: conversationId,
    lastDate: lastDate,
  });
}

function getProfileConversations(token) {
  return servers.chatServer.get('/teachme/profile/conversations', {
    token: token,
  });
}

function getConversation(token, teacher_id, student_id) {
  return servers.chatServer.get('/teachme/conversation', {
    token: token,
    teacher_id: teacher_id,
    student_id: student_id,
  });
}

export default {getMessages, getProfileConversations, getConversation};
