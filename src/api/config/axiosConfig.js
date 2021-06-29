import axios from 'axios';
// import { ENV_MODE_DEV, ENV_MODE_PROD } from 'lib/setting';
// import { BaseActions } from 'store/actionCreators';
// import store from 'store';
// import { keys, setCookie, setSessionCookie } from 'src/utils/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { todoState, useTodo } from 'src/store/modules/todo';
// import { useTodo } from 'src/store/';

// const getToken = async () => {
//   // console.log(AsyncStorage.getItem('token'));
//   const token = await AsyncStorage.getItem('token');
//   console.log('token', token);
//   return token;
// };

/**
 * @param {*} axiosConf object
 * 통신할때 필요한 axios의 config 값을 넣어줍니다.
 */

// NOTE: 취소 토큰
// const { CancelToken } = axios;
// const source = CancelToken.source();
export function axs(axiosConf) {
  // const token = getToken();

  // set Authorization
  // if (!!store.getState().auth.accessToken)
  //   axiosConf.headers = { 'x-access-token': store.getState().auth.accessToken };

  // axiosConf.cancelToken = source.token;
  // NOTE: 차후 cancel 필요시 추가 개발
  // if (axiosConf.cancel) source.cancel('Operation canceled');

  // NOTE: 기본 타임아웃: 10초
  if (axiosConf.timeout !== false) axiosConf.timeout = 10000;

  // NOTE: 보낸 데이터 payload data(data, url, method, params) 확인용
  axiosConf.data = axiosConf.data ? axiosConf.data : {};
  axiosConf.data.url = axiosConf.url;
  axiosConf.data.method = axiosConf.method;
  if (axiosConf.params) axiosConf.data.params = axiosConf.params;

  return axios(axiosConf)
    .then(response => {
      // console.log(response, 'response');
      // if (response.headers['x-access-token']) {
      //   const accessToken = response.headers['x-access-token'];
      //   response.data.accessToken = accessToken;
      //   response.data.payload = axiosConf.data;
      //   // 자동 accessToken 갱신
      //   setSessionCookie(keys.sign_in_token, accessToken);
      //   if (store.getState().auth.autoLogin)
      //     setCookie(keys.remember_user_token, accessToken, { 'max-age': 3600 * 6 });
      // }

      return response;
    })
    .catch(error => {
      const { response = {}, request = '', message = '' } = error;
      const { data = null, status = '', headers = null } = response;
      // const responseStatus = data?.status ? data.status : status;
      const responseStatus = status;
      const responseMessage = data?.msg ? data.msg : message;

      // if (!!(String(responseStatus).charAt(0) !== '5')) {
      //   BaseActions.response_status(responseStatus);
      // }
      // if (ENV_MODE_PROD && !!(String(responseStatus).charAt(0) === '5')) {
      //   BaseActions.response_status(500);
      // }
      // throw {
      //   status: responseStatus,
      //   message: responseMessage,
      //   payload: axiosConf.data,
      // };

      throw error;
    });
}

/**
 * Test Server Set Header
 * @param {} axiosConf
 */
export function setHeader(axiosConf) {
  // NOTE: receiver : 20Jan31-0001
  // NOTE: sender : 20Feb12-0002
  let headerObj;
  if (ENV_MODE_DEV) {
    headerObj = {
      headers: {
        'x-access-token': '',
      },
    };
  }
  Object.assign(axiosConf.data, headerObj);
  return axiosConf;
}
