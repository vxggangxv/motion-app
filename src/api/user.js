import axios from 'axios';
import request from './config/axiosUtils';
import { BASE_API_URL } from 'utils/setting';

const basPath = `${BASE_API_URL}/user`;

export function fetchProfile() {
  return request.get(`${basPath}`)();
}

export function editProfile(data) {
  return request.put(`${basPath}`, data)();
}

export function sendSupportEmail(data) {
  return request.post(`${basPath}/support`, data)();
}
