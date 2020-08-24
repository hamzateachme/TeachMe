import login from '../api/login';
import profileApi from '../api/profilesApi';

async function authenticate(email, password) {
  var response = await login.authenticate({
    email: email,
    password: password,
  });
  if (response.ok) {
    const token = response.data.token;
    response = await profileApi.getProfile(token);
    if (response.ok) {
      return {profile: {...response.data, token: token}};
    } else {
      return response.problem;
    }
  } else {
    return response.problem;
  }
}

async function register(values) {
  var response = await login.register(values);
  if (response.ok) {
    const token = response.data.token;
    response = await profileApi.getProfile(token);
    if (response.ok) {
      return {profile: {...response.data, token: token}};
    } else {
      return response.problem;
    }
  } else {
    return response.problem;
  }
}

export default {authenticate, register};
