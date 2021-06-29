import axios from 'axios';
import { setInterceptors } from './config/interceptors';
import { BASE_API_URL } from 'utils/setting';

// instance & interceptor
function create(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  return instance;
}

function createWithAuth(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  setInterceptors(instance);
  return instance;
}

export const auth = create(BASE_API_URL);
export const posts = createWithAuth(`${BASE_API_URL}posts/`);
