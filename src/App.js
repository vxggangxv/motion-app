import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import client, {
  apiCallingVar,
  autoLoginVar,
  errorsVar,
  isLoggedInVar,
  tokenVar,
  userVar,
  TOKEN,
  USER,
  MESSAGING_TOKEN,
  AUTO_LOGIN,
  logUserOut,
  logUserIn,
} from 'store/apollo';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, tokenState } from 'store/modules/auth';
import { NavigationContainer } from '@react-navigation/native';
import { editTodo, fetchTodo } from 'api/todo';
import { todoQuery } from 'store/modules/todo';
import Core from 'containers/base/Core';
import NavController from 'components/base/NavController';
import { colors } from 'styles/utils';
import messaging from '@react-native-firebase/messaging';
import { createMessagingToken, editMessagingToken, signIn } from 'api/auth';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  // const setToken = useSetRecoilState(tokenState);
  // const token = useRecoilValue(tokenState);
  // const errors = useReactiveVar(errorsVar);
  // const todo = useRecoilValue(todoQuery(1));
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const token = useReactiveVar(tokenVar);
  const onFinish = () => setLoading(false);

  // TEST: 테스트용 코드
  // useEffect(() => {
  //   // logUserIn('token');
  //   logUserOut();
  // }, []);
  // useEffect(() => {
  //   console.log('check token', tokenVar);
  // }, [tokenVar]);
  // useEffect(() => {
  //   // console.log('apiCallingVar()', apiCallingVar());
  // }, [apiCallingVar()]);

  // 'Open Sans', sans-serif;
  // assets
  const preloadAssets = () => {
    const fontsToLoad = [
      // Ionicons.font,
      { OpenSansRegular: require('assets/fonts/OpenSans-Regular.ttf') },
      { OpenSansItalic: require('assets/fonts/OpenSans-Italic.ttf') },
      { OpenSansSemiBold: require('assets/fonts/OpenSans-SemiBold.ttf') },
      { OpenSansSemiBoldItalic: require('assets/fonts/OpenSans-SemiBoldItalic.ttf') },
      { OpenSansBold: require('assets/fonts/OpenSans-Bold.ttf') },
    ];
    const fontPromises = fontsToLoad.map(font => Font.loadAsync(font));

    // const imagesToLoad = [require('./assets/logo.png')];
    const imagesToLoad = [
      require('assets/images/contents/main_bg.png'),
      require('assets/images/contents/craft_motion_app.png'),
    ];
    const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  // 로그인 정보 가져오기
  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    const user = await AsyncStorage.getItem(USER);
    const autoLogin = await AsyncStorage.getItem(AUTO_LOGIN);
    console.log('token', token);
    console.log('user', user);
    console.log('autoLogin', autoLogin);
    if (token && user) {
      // setIsLoggedIn(true);
      // setToken(token);
      tokenVar(token);
      if (autoLogin === 'true') {
        isLoggedInVar(true);
        userVar(JSON.parse(user));
      }
    }

    return preloadAssets();
  };

  // notifications
  useEffect(() => {
    if (isLoggedIn) {
      // Get the device token
      messaging()
        .getToken()
        .then(async token => {
          await AsyncStorage.setItem(MESSAGING_TOKEN, token);
          console.log('messaging token', token);
          // TODO: backend api 연동
          // return saveTokenToDatabase(token);
          if (token) {
            console.log('call createMessagingToken');
            return createMessagingToken({ token });
          }
        });
      // If using other push notification providers (ie Amazon SNS, etc)
      // you may need to get the APNs token instead for iOS:
      // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
      // Listen to whether the token changes
      return messaging().onTokenRefresh(async token => {
        const messagingToken = await AsyncStorage.getItem(MESSAGING_TOKEN);
        // TODO: backend api 연동
        // saveTokenToDatabase(token);
        const data = {
          token: messagingToken,
          newToken: token,
        };
        console.log('messaging refresh token data', data);
        editMessagingToken(data);
      });
    }
    // else {
    //   messaging().deleteToken();
    // }
  }, [isLoggedIn]);

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }

  return (
    // <View style={styles.container}>
    //   <Text>{isLoggedIn ? 'logIn' : 'logOut'}</Text>
    // </View>
    <ApolloProvider client={client}>
      {/* <Text>{todo?.title}</Text> */}
      <StatusBar backgroundColor={colors.navy} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="App"
            options={{
              headerShown: false,
            }}
          >
            {() => <NavController />}
          </Stack.Screen>
        </Stack.Navigator>

        {/* <NavController /> */}
      </NavigationContainer>
      <Core />
    </ApolloProvider>
    // <NavigationContainer><NavController /></NavigationContainer>
    // <ApolloProvider client={client}>
    //   <NavigationContainer><NavController /></NavigationContainer>
    //   <View style={styles.container}>
    //     <Text>{isLoggedIn ? 'logIn' : 'logOut'}</Text>
    //   </View>
    // </ApolloProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
