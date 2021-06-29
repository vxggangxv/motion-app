import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const GetStarted = styled.TouchableOpacity``;
const OtherLink = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 30px;
`;

export default function Welcome({ navigation }) {
  const goToMachineList = () => navigation.navigate('MachineList');
  const goToProfile = () => navigation.navigate('Modal', { screen: 'Profile' });

  return (
    <Container>
      <Text style={{ color: 'white' }}>Welcome - Logged In</Text>
      <GetStarted onPress={goToMachineList}>
        <OtherLink>Go to MachineList</OtherLink>
      </GetStarted>
      {/* <GetStarted onPress={goToProfile}>
        <OtherLink>Go to Profile</OtherLink>
      </GetStarted> */}
    </Container>
  );
}
