import {create} from 'apisauce';

const authenticationServer = create({
  baseURL: 'http://192.168.18.2:3000',
});

const profileServer = create({
  baseURL: 'http://192.168.18.2:3001',
});

const chatServer = create({
  baseURL: 'http://192.168.18.2:3002',
});

export default {authenticationServer, profileServer, chatServer};
