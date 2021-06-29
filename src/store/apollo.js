import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ApolloClient,
  makeVar,
  InMemoryCache,
  // createHttpLink,
  // split,
} from '@apollo/client';
import { signOut } from 'api/auth';
import { setAuthInHeader } from 'api/config/axiosUtils';

export const TOKEN = 'token';
export const USER = 'user';
export const MESSAGING_TOKEN = 'messagingToken';
export const AUTO_LOGIN = 'autoLogin';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar(null);
// export const messagingTokenVar = makeVar('');
export const userVar = makeVar(null);
// export const autoLoginVar = makeVar(null);
export const apiCallingVar = makeVar(false);
export const errorsVar = makeVar('');

export const apiLoading = loading => {
  apiCallingVar(loading);
};

export const logUserIn = async (token, data) => {
  await AsyncStorage.setItem(TOKEN, token);
  tokenVar(token);
  setAuthInHeader(token);
  // login시 data에 userData또는 true 전달
  // user data, 따로 저장 안할 경우, true 반환시 isLoggedIn true 변경
  if (data) {
    isLoggedInVar(true);
    saveUser(data);
  }
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  tokenVar(null);
  isLoggedInVar(false);
  deleteUser();
};

export const logOutRequest = async () => {
  await signOut();
  // autoLogin
  await AsyncStorage.removeItem(AUTO_LOGIN);
  // user
  logUserOut();
};

export const saveUser = async data => {
  // console.log('data', data);
  await AsyncStorage.setItem(USER, JSON.stringify(data));
  userVar(data);
};

export const deleteUser = async () => {
  await AsyncStorage.removeItem(USER);
  userVar(null);
};

const client = new ApolloClient({
  // link: splitLink,
  cache: new InMemoryCache(),
});
export default client;
