import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import WelcomeIn from 'screens/WelcomeIn';
import { colors } from 'styles/utils';
// import Profile from 'screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function ModalNav(props) {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerShown: false,
        // headerTintColor: 'white',
        // headerBackTitleVisible: true,
        // headerTitleAlign: 'center',
        // headerTitleStyle: {
        //   fontSize: 16,
        //   color: colors.blue,
        // },
        // headerStyle: {
        //   backgroundColor: colors.navy,
        // },
        // headerBackImage: ({ tintColor }) => (
        //   <Icon color={tintColor} name="chevron-back" size={20} />
        // ),
        // cardStyle: {
        //   backgroundColor: colors.navy,
        // },
      }}
    >
      {/* <Stack.Screen
        name="WelcomeIn"
        options={{
          headerTitle: false,
          headerTransparent: true,
        }}
        component={WelcomeIn}
      /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
}
