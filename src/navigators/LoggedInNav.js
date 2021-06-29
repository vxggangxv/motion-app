import React, { useEffect } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from 'styles/utils';
import Icon from 'react-native-vector-icons/Ionicons';
// import WelcomeIn from 'screens/WelcomeIn';
// import MachineList from 'screens/machine/MachineList';
// import AppText from 'components/common/AppText';
// import LogIn from 'screens/LogIn';
// import Welcome from 'screens/Welcome';
// import CreateAccount from 'screens/CreateAccount';
// import EditProfile from 'screens/profile/EditProfile';
// import Machine from 'screens/machine/Machine';
// import Jun from 'screens/Jun';
// import SwipeGesture from 'components/common/gesture/SwipeGesture';
// import ToolList from 'screens/machine/ToolList';
// import Support from 'screens/support/Support';
// import SelectPhoto from 'screens/photo/SelectPhoto';
// import TakePhoto from 'screens/photo/TakePhoto';
// import { screenHeight } from 'utils/constants';
// import { useNavigation } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import MainNav from 'navigators/MainNav';
import ModalNav from 'navigators/ModalNav';

const Stack = createStackNavigator();

export default function LoggedInNav({ initialRouteName }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{
          headerShown: false,
        }}
      >
        {() => <MainNav initialRouteName={initialRouteName} />}
      </Stack.Screen>
      <Stack.Screen name="Modal" component={ModalNav} />
    </Stack.Navigator>
  );
}
