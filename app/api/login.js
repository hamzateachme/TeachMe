import servers from './apiServers';
import ImgToBase64 from 'react-native-image-base64';

function getSecureKey() {
  return servers.authenticationServer.get('/teachme/');
}

function sendSecureKey(key) {
  return servers.authenticationServe.post('/teachme/secure', {key: key});
}

function authenticate({email, password}) {
  return servers.authenticationServer.post('/teachme/login', {
    email: email,
    password: password,
  });
}

async function register(values) {
  const data = new FormData();
  for (var key in values) {
    data.append(key, values[key]);
  }
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  };
  return servers.authenticationServer.post('/teachme/register', data, config);
}

export default {authenticate, register, getSecureKey, sendSecureKey};
