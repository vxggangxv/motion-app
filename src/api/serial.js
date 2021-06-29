import { BASE_API_URL } from 'utils/setting';
import request from './config/axiosUtils';

const basePath = `${BASE_API_URL}/serial`;

export function fetchMachines(params) {
  return request.get(`${basePath}`, params)();
}

export function fetchMachine(id) {
  return request.get(`${basePath}/${id}`)();
}

export function createEnrolledMachine(id) {
  return request.post(`${basePath}/enroll/${id}`)();
}

export function deleteEnrolledMachine(id) {
  return request.delete(`${basePath}/enroll/${id}`)();
}

export function fetchNcFiles(id) {
  return request.get(`${basePath}/ncfile/${id}`)();
}

export function fetchMachineMessage(id) {
  return request.get(`${basePath}/msg/${id}`)();
  // return request.get(`${basePath}/msg/${id}`, { page: 1 })();
}

export function fetchTools(id) {
  return request.get(`${basePath}/tool/${id}`)();
}
