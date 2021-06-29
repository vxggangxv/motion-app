import React from 'react';
import App from './App';
import AppErrorBoundary from 'components/base/error/AppErrorBoundary';
import TextLoading from 'components/base/loading/TextLoading';
import { RecoilRoot } from 'recoil';
import messaging from '@react-native-firebase/messaging';

// const remoteMessage = {
//   collapseKey: 'com.dofmotion',
//   data: {},
//   from: '54266724577',
//   messageId: '0:1623750195441701%a6b0d484a6b0d484',
//   notification: { android: {}, body: 'Content back', title: 'Title back' },
//   sentTime: 1623750180621,
//   ttl: 2419200,
// };

// TODO: push icon 설정, 시간나타남?
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  console.log('remoteMessage?.data', remoteMessage?.data);
  console.log('remoteMessage?.data', typeof remoteMessage?.data);
  // const remoteMessageData = JSON.parse(remoteMessage?.data);
  // console.log('remoteMessageData', remoteMessageData);
  // console.log('remoteMessageData', typeof remoteMessageData);
});

export default function Root(props) {
  return (
    <RecoilRoot>
      <AppErrorBoundary>
        <React.Suspense fallback={<TextLoading />}>
          <App />
        </React.Suspense>
      </AppErrorBoundary>
    </RecoilRoot>
  );
  // return (
  //   <AppErrorBoundary>
  //     <App />
  //   </AppErrorBoundary>
  // );
  // return <App />;
}
