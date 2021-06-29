import axios from 'axios';
// import { axs } from './config/axiosConfig';
import request from './config/axiosUtils';

// const domain = 'https://jsonplaceholder.typicode.com';
const basPath = `https://jsonplaceholder.typicode.com/todos`;

export function fetchTodos() {
  return request.get(`${basPath}`)();
  // return request.get(`${basPath}`)({ isShowApiCalling: false });
  // return axios.get(`https://jsonplaceholder.typicode.com/todos`);
}

export function fetchTodo(id) {
  return request.get(`${basPath}/${id}`)();
  // return request.get(`${basPath}/${id}`)({ isShowApiCalling: false });
  // return axios.get(`${basPath}/${id}`);
}

// TEST: test용 임시
// editTodo(id, data);
export function editTodo(id) {
  return request.put(`${basPath}s/${id}`)();
}
