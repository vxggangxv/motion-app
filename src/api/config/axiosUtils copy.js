import axios from 'axios';
import { Alert } from 'react-native';
import {
  errorsVar,
  apiCallingVar,
  tokenVar,
  logUserIn,
  logUserOut,
  logOutRequest,
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
    console.log(`request get ${path}`);
    return (config = {}) => {
      // NOTE: options필요시 추가 개발
      const { options = {}, isShowApiCalling = true, isShowError = true } = config;
      return axios
        .get(`${path}`, {
          params,
          headers: { 'x-access-token': tokenVar() },
          ...options,
        })
        .then(response => {
          if (isShowApiCalling) apiCallingVar(true);
          if (response.headers['x-access-token']) logUserIn(response.headers['x-access-token']);
          // if ('token10') logUserIn('token10');
          return response;
        })
        .catch(error => {
          const status = error.response?.status;
          if (status === Unauthorized) return onUnauthorized();
          // console.log('error.response', error.response);
          console.log('error', error);
          if (isShowError) {
            const errorMessage = error.response?.data?.msg || error.message;
            Alert.alert('Failed', errorMessage);
          }
          throw error;
        })
        .finally(() => {
          // TEST:
          // if (isShowApiCalling) {
          //   setTimeout(() => {
          //     apiCallingVar(false);
          //   }, 5000);
          // }
          if (isShowApiCalling) apiCallingVar(false);
        });
    };
  },
  post(path, data) {
    console.log(`request post ${path}`);
    return (config = {}) => {
      const { options = {}, isShowApiCalling = true, isShowError = true } = config;
      return axios
        .post(`${path}`, data, { headers: { 'x-access-token': tokenVar() }, ...options })
        .then(response => {
          if (isShowApiCalling) apiCallingVar(true);
          if (response.headers['x-access-token']) logUserIn(response.headers['x-access-token']);
          // console.log('response', response);
          return response;
        })
        .catch(error => {
          console.log('error', error);
          if (isShowError) {
            const errorMessage = error.response?.data?.msg || error.message;
            Alert.alert('Failed', errorMessage);
          }
          throw error;
        })
        .finally(() => {
          if (isShowApiCalling) apiCallingVar(false);
        });
    };
  },
  put(path, data) {
    console.log(`request put ${path}`);
    return (config = {}) => {
      const { options = {}, isShowApiCalling = true, isShowError = true } = config;
      return axios
        .put(`${path}`, data, { headers: { 'x-access-token': tokenVar() }, ...options })
        .then(response => {
          if (isShowApiCalling) apiCallingVar(true);
          if (response.headers['x-access-token']) logUserIn(response.headers['x-access-token']);
          return response;
        })
        .catch(error => {
          // errorsVar('response put error');
          // Alert.alert('Alert', error.message);
          // errorsVar(error);
          console.log('error', error);
          if (isShowError) {
            const errorMessage = error.response?.data?.msg || error.message;
            Alert.alert('Failed', errorMessage);
          }
          throw error;
        })
        .finally(() => {
          if (isShowApiCalling) apiCallingVar(false);
        });
    };
  },
  delete(path, data) {
    console.log(`request delete ${path}`);
    return (config = {}) => {
      const { options = {}, isShowApiCalling = true, isShowError = true } = config;
      return axios
        .delete(`${path}`, data, { headers: { 'x-access-token': tokenVar() }, ...options })
        .then(response => {
          if (isShowApiCalling) apiCallingVar(true);
          if (response.headers['x-access-token']) logUserIn(response.headers['x-access-token']);
          return response;
        })
        .catch(error => {
          console.log('error', error);
          if (isShowError) {
            const errorMessage = error.response?.data?.msg || error.message;
            Alert.alert('Failed', errorMessage);
          }
          throw error;
        })
        .finally(() => {
          if (isShowApiCalling) apiCallingVar(false);
        });
    };
  },
};

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
};

function axiosConfig(path, data, methodType, config = {}) {
  let method = '';
  if (methodType === 'get') method = 'get';
  if (methodType === 'post') method = 'post';
  if (methodType === 'put') method = 'put';
  if (methodType === 'delete') method = 'delete';

  const { options = {}, isShowApiCalling = true, isShowError = true } = config;
  let axiosData = { url: path, method, headers: { 'x-access-token': tokenVar() }, ...options };
  if (method === 'get') axiosData = { ...axiosData, params: data };
  if (method !== 'get') axiosData = { ...axiosData, data };

  axios(axiosData)
    .then(response => {
      if (isShowApiCalling) apiCallingVar(true);
      if (response.headers['x-access-token']) logUserIn(response.headers['x-access-token']);
      return response;
    })
    .catch(error => {
      console.log('error', error);
      if (isShowError) {
        const errorMessage = error.response?.data?.msg || error.message;
        Alert.alert('Failed', errorMessage);
      }
      throw error;
    })
    .finally(() => {
      if (isShowApiCalling) apiCallingVar(false);
    });
}

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
