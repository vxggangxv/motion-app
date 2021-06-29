import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'store/modules/auth';
import LoggedInNav from 'navigators/LoggedInNav';
import LoggedOutNav from 'navigators/LoggedOutNav ';
import styled from 'styled-components';
import messaging from '@react-native-firebase/messaging';
import { isLoggedInVar } from 'store/apollo';
import { useReactiveVar } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

export default function NavController(props) {
  const navigation = useNavigation();
  const [messagingLoading, setMessagingLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('MachineList');
  // const [initialRouteName, setInitialRouteName] = useState('Jun');
  // const [initialRouteName, setInitialRouteName] = useState('Support');
  // const [initialRouteName, setInitialRouteName] = useState('Machine');
  // const [initialRouteName, setInitialRouteName] = useState('ToolList');
  // const isLoggedIn = useRecoilValue(isLoggedInState);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  // TODO: notification messaging 클릭시 페이지 이동 처리 등
  useEffect(() => {
    // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log('Notification caused app to open from quit state:', remoteMessage);
    //       // if (remoteMessage?.data?.type) setInitialRouteName(remoteMessage.data.type); // e.g. "Settings"
    //       if (remoteMessage?.data?.screen) setInitialRouteName(remoteMessage.data.screen);
    //       // page
    //       // notification alarm: Complete, Error
    //       // screen: 'Machine',
    //       // serialNumber: 'sdfsdfa',
    //     }
    //     console.log('messagingLoading false');
    //     setMessagingLoading(false);
    //   });

    // 디테일 페이지 이동을 위해 두 메서드 모두 Controller에 위치
    // NODE: 차후 screen과 params 많아질 경우 파싱 테스트 통해 추가 개발
    // ex "navigate": "{\"name\":\"Machine\",\"params\":{\"serialNumber\":\"21010046AAA\"}}"
    // const navigate = '{"name":"Machine","params":{"serialNumber":"21010046AAA"}}';
    // console.log('navigate', navigate);
    // console.log('navigate', typeof JSON.parse(navigate));
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
          if (remoteMessage?.data?.screen) {
            if (remoteMessage.data.screen === 'Machine') {
              navigation.navigate(remoteMessage.data.screen, {
                serialNumber: remoteMessage.data.serialNumber,
              });
            }
          }
        }
        console.log('messagingLoading false');
        // setMessagingLoading(false);
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      // if (remoteMessage?.data?.type) navigation.navigate(remoteMessage.data.type);
      if (remoteMessage?.data?.screen) {
        if (remoteMessage.data.screen === 'Machine') {
          navigation.navigate(remoteMessage.data.screen, {
            serialNumber: remoteMessage.data.serialNumber,
          });
        }
      }
    });
  }, []);

  // if (messagingLoading) return null;

  return (
    <>
      {isLoggedIn ? (
        <LoggedInNav initialRouteName={initialRouteName} />
      ) : (
        <LoggedOutNav initialRouteName={initialRouteName} />
      )}
    </>
  );
}
