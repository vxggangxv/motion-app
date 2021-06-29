import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import {
  errorsVar,
  apiCallingVar,
  tokenVar,
  logUserIn,
  logUserOut,
  logOutRequest,
  TOKEN,
} from 'store/apollo';
// import { Alert } from 'react-native';

// const domain = 'http://localhost:3000';
// const domain = 'https://jsonplaceholder.typicode.com';
const Unauthorized = 401;
export const onUnauthorized = () => {
  // router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
  logOutRequest();
};

// TODO: 필요시 Error toast 추가 / recoil error handle 공통화 / 필요시 axios options 값 도입
/**
 * ex) request.get(`${path}`)();
 * ex) request.get(`${path}`)({isShowApiCalling = false});
 */
export const request = {
  get(path, params) {
    // return axios.get(`${path}`).catch(({ response }) => {
    //   const { status } = response;
    //   if (status === Unauthorized) return onUnauthorized();
    //   console.log('response', response);
    //   throw Error(response);
    // });
    // console.log(`request get ${path}`);
    return (config = {}) => {
      return axiosConfig(path, params, 'get', config);
    };
  },
  post(path, data) {
    // console.log(`request post ${path}`);
    return (config = {}) => {
      return axiosConfig(path, data, 'post', config);
    };
  },
  put(path, data) {
    // console.log(`request put ${path}`);
    return (config = {}) => {
      return axiosConfig(path, data, 'put', config);
    };
  },
  delete(path, data) {
    // console.log(`request delete ${path}`);
    return (config = {}) => {
      return axiosConfig(path, data, 'delete', config);
    };
  },
};

// NOTE: require cycle오류, recoilVar의 cycle표시, 구동 문제 없음
async function axiosConfig(path, data, methodType, config = {}) {
  let method = '';
  if (methodType === 'get') method = 'get';
  if (methodType === 'post') method = 'post';
  if (methodType === 'put') method = 'put';
  if (methodType === 'delete') method = 'delete';

  const { options = {}, isShowApiCalling = true, isShowError = true } = config;
  token = tokenVar() || (await AsyncStorage.getItem(TOKEN));
  let axiosData = { method, url: path, headers: { 'x-access-token': token }, ...options };
  // let axiosData = { method, url: path, ...options };
  if (method === 'get' && !!data) axiosData = { ...axiosData, params: data };
  if (method !== 'get') axiosData = { ...axiosData, data };
  // console.log('axiosData', axiosData);

  if (__DEV__) {
    console.group(`-- ${method}: ${path} Request `);
    console.log(`RequestData:\n`, axiosData);
    console.groupEnd();
  }

  // NOTE: warning 표시, 구동 이상은 없음 / 배포시 적용, apiCall의 경우 자동 로딩 표시 기능
  // if (!__DEV__ && isShowApiCalling) apiCallingVar(true);
  // apiCallingVar(true);

  return axios(axiosData)
    .then(response => {
      if (__DEV__) {
        console.group(`-- ${method}: ${path} Request Success`);
        console.log(`ResponseHeaders :\n`, response.headers);
        console.log(`ResponseData :\n`, response.data);
        console.groupEnd();
      }

      const accessToken = response.headers['x-access-token'];
      if (accessToken) logUserIn(accessToken);
      return response;
    })
    .catch(error => {
      if (__DEV__) {
        console.group(`-- ${method}: ${path} Request Error`);
        console.log(`Error :\n`, error);
        console.groupEnd();
      }
      const status = error.response?.status;
      // 401에러시
      if (status === Unauthorized) {
        onUnauthorized();
        Alert.alert('Failed', 'Please log in');
        throw error;
      }
      if (isShowError) {
        const errorMessage = error.response?.data?.msg || error.message;
        Alert.alert('Failed', errorMessage);
      }
      throw error;
    })
    .finally(() => {
      // if (!__DEV__ && isShowApiCalling) apiCallingVar(false);
      // apiCallingVar(false);
    });
}

export const setAuthInHeader = token => {
  // axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  axios.defaults.headers.common['x-access-token'] = token;
};

export default request;

// export const request = {
//   get(path) {
//     return axios.get(`${path}`).catch(({ response }) => {
//       const { status } = response;
//       if (status === Unauthorized) return onUnauthorized();
//       throw Error(response);
//     });
//   },
//   post(path, data) {
//     return axios.post(`${path}`, data);
//   },
//   delete(path) {
//     return axios.delete(`${path}`);
//   },
//   put(path, data) {
//     return axios.put(`${path}`, data);
//   },
// };
