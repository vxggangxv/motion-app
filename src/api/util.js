import axios from 'axios';
import request from './config/axiosUtils';
import { BASE_API_URL } from 'utils/setting';

const basPath = `${BASE_API_URL}/util`;
// const basPath = `http://15.164.27.98:27521/api/v1/util`;

export function fetchCountries() {
  return request.get(`${basPath}/country`)();
}
