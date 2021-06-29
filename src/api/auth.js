import axios from 'axios';
import request from './config/axiosUtils';
import { BASE_API_URL } from 'utils/setting';

const basPath = `${BASE_API_URL}/auth`;
const userPath = `${BASE_API_URL}/user`;
// const userPath = `http://15.164.27.98:27521/api/v1/user`;

// "email" : "kyh@doflab.com", "nickname" : "kyh", "password" : "dof0070!", "passwordConfirm" : "dof0070!", "countries_id" : 116
export function signUp(data) {
  return request.post(`${userPath}`, data)();
}

export function signIn(data) {
  return request.post(`${userPath}/login`, data)();
}

export function signOut(data) {
  return request.post(`${userPath}/logout`, data)();
}

export function sendResetEmail(data) {
  return request.post(`${userPath}/password/reset`, data)();
}

// token
export function createMessagingToken(data) {
  return request.post(`${basPath}/firebase/token`, data)();
}

// token, newToken
export function editMessagingToken(data) {
  return request.put(`${basPath}/firebase/token`, data)();
}
