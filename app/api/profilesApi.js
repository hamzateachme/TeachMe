import servers from './apiServers';

function getProfile(token) {
  return servers.profileServer.get('/teachme/profile', {token: token});
}

function getClasses(token) {
  return servers.profileServer.get('/teachme/classes', {token: token});
}

function setClasses(token, classes) {
  return servers.profileServer.post('/teachme/profile/classes', {
    token: token,
    classes: classes,
  });
}

function getConversationProfiles(token, ids) {
  return servers.profileServer.post('/teachme/conversation/profile', {
    token: token,
    ids: ids,
  });
}

export default {getProfile, getClasses, setClasses, getConversationProfiles};
