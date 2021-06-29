import React, { useEffect, useState } from 'react';
import { Text, View, Animated, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

export default function FirebaseMessageContainer(props) {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);

  // remoteMessage: {
  //   notification: {
  //     messageId: '0:123123123123',
  //     collapseKey: 'com.dofmotion',
  //     andriod: {},
  //     title: '',
  //     body: '',
  //     from: new Date(),
  //     sentTime: new Date(),
  //     data: {},
  //   },
  // };
  // TODO: IOS 테스트시 확인
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // console.log('messaging.AuthorizationStatus', messaging.AuthorizationStatus);
    if (enabled) {
      setHasPermission(true);
      console.log('Authorization status:', authStatus);
    } else {
      setHasPermission(false);
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  // 실제 적용시 Machine 페이지 입장시 구독 시작
  // useEffect(() => {
  //   messaging()
  //     .subscribeToTopic('21010046AAA')
  //     .then(response => {
  //       console.log('subscribe');
  //       console.log(response);
  //     });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log('Message handled in the foreground!', remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   if (hasPermission) {
  //     // Register foreground handler
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //       console.log('Message handled in the foreground!', remoteMessage);
  //     });

  //     return unsubscribe;
  //   }
  // }, [hasPermission]);

  return (
    <View>
      <Text style={{ color: 'white' }}>Hi</Text>

      <TouchableOpacity onPress={() => navigation.navigate('MachineList')}>
        <Text style={{ color: 'white' }}>Go to MachineList</Text>
      </TouchableOpacity>
    </View>
  );
}
