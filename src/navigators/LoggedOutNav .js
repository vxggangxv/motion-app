import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import Welcome from 'screens/Welcome';
import LogIn from 'screens/LogIn';
import { colors, defaultFont } from 'styles/utils';
import AppText from 'components/common/AppText';
import CreateAccount from 'screens/CreateAccount';
import Icon from 'react-native-vector-icons/Ionicons';
import Jun from 'screens/Jun';

const Stack = createStackNavigator();

export default function LoggedOutNav({ initialRouteName }) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitleVisible: true,
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
      <Stack.Screen
        name="Welcome"
        options={{
          headerTitle: false,
          headerTransparent: true,
        }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen
        name="CreateAccount"
        options={{
          title: 'SignUp',
        }}
        component={CreateAccount}
      />
      <Stack.Screen name="Jun" component={Jun} />
    </Stack.Navigator>
  );
}
