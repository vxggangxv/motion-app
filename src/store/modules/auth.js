import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, useSetRecoilState } from 'recoil';

export const isLoggedInState = atom({
  key: 'auth/isLogInState',
  default: false,
});

export const tokenState = atom({
  key: 'auth/tokenState',
  default: '',
});

// const TOKEN = 'token';

// export const logUserIn = async token => {
//   const setIsLoggedIn = useSetRecoilState(isLoggedInState);
//   const setToken = useSetRecoilState(tokenState);
//   await AsyncStorage.setItem(TOKEN, token);
//   setIsLoggedIn(true);
//   setToken(token);
// };

// export const logUserOut = async () => {
//   await AsyncStorage.removeItem(TOKEN);
//   isLoggedInVar(false);
//   tokenVar(null);
// };
