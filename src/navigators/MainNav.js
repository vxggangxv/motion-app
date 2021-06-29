import React, { useEffect } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from 'styles/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeIn from 'screens/WelcomeIn';
import MachineList from 'screens/machine/MachineList';
import AppText from 'components/common/AppText';
import LogIn from 'screens/LogIn';
import Welcome from 'screens/Welcome';
import CreateAccount from 'screens/CreateAccount';
import EditProfile from 'screens/profile/EditProfile';
import Machine from 'screens/machine/Machine';
import Jun from 'screens/Jun';
import SwipeGesture from 'components/common/gesture/SwipeGesture';
import ToolList from 'screens/machine/ToolList';
import Support from 'screens/support/Support';
import SelectPhoto from 'screens/photo/SelectPhoto';
import TakePhoto from 'screens/photo/TakePhoto';
import { screenHeight } from 'utils/constants';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

export default function LoggedInNav({ initialRouteName }) {
  const navigation = useNavigation();
  // console.log('initialRouteName', initialRouteName);

  // TODO: notification messaging 클릭시 페이지 이동 처리 등
  useEffect(() => {
    // // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log('Notification caused app to open from background state:', remoteMessage);
    //   // if (remoteMessage?.data?.type) navigation.navigate(remoteMessage.data.type);
    //   if (remoteMessage?.data?.screen) {
    //     if (remoteMessage.data.screen === 'Machine') {
    //       navigation.navigate(remoteMessage.data.screen, {
    //         serialNumber: remoteMessage.data.serialNumber,
    //       });
    //     }
    //   }
    // });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      // initialRouteName="Jun"
      // initialRouteName="TakePhoto"
      // initialRouteName="SelectPhoto"
      // initialRouteName="Support"
      // initialRouteName="MachineList"
      // headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitleVisible: true,
        // headerTruncatedBackTitle: 'bb',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
          color: colors.blue,
          // fontFamily: defaultFont.regular,
        },
        headerStyle: {
          backgroundColor: colors.navy,
          // borderBottomColor: 'white',
          // shadowColor: colors.navy,
        },
        headerBackImage: ({ tintColor }) => (
          <Icon color={tintColor} name="chevron-back" size={20} />
        ),
        cardStyle: {
          backgroundColor: colors.navy,
        },
      }}
    >
      {/* <Stack.Screen
        name="WelcomeIn"
        options={{
          headerTitle: false,
          headerTransparent: true,
          component={WelcomeIn}
        }}
      /> */}
      <Stack.Screen
        name="MachineList"
        options={{
          headerLeft: () => null,
        }}
        component={MachineList}
      />
      <Stack.Screen
        name="Machine"
        options={{
          title: 'Machine',
          headerBackTitle: 'List',
        }}
        component={Machine}
      />
      <Stack.Screen
        name="ToolList"
        options={{
          title: 'ToolList',
        }}
        component={ToolList}
      />
      <Stack.Screen
        name="EditProfile"
        options={{
          title: 'Modify',
          headerBackTitle: 'List',
        }}
        component={EditProfile}
      />
      <Stack.Screen
        name="Support"
        options={{
          headerBackTitle: 'List',
        }}
        component={Support}
      />
      <Stack.Screen
        name="SelectPhoto"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => <Icon color={tintColor} name="close" size={22} />,
          // gestureEnabled: true,
          // gestureResponseDistance: {
          //   vertical: screenHeight,
          // },
          // ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        component={SelectPhoto}
      />
      <Stack.Screen
        name="TakePhoto"
        options={{
          headerShown: false,
        }}
        component={TakePhoto}
      />
      <Stack.Screen name="Jun" component={Jun} />
    </Stack.Navigator>
  );
}

// <Stack.Navigator mode="modal">
//   <Stack.Screen
//     name="Main"
//     component={MainNav}
//     options={{
//       headerShown: false,
//     }}
//   />
//   <Stack.Screen name="Modal" component={ModalNav} />
// </Stack.Navigator>
