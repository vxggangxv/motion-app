import React from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/utils';
import AppText from './AppText';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
// const HeaderLeft = styled(TouchableWithoutFeedback)``;
const HeaderLeft = styled.View``;
const HeaderRight = styled.View``;
const HeaderTitle = styled.View``;

export default function AppHeader({ scene, previous, navigation }) {
  return (
    <Container>
      <HeaderLeft onPress={navigation.goBack}>
        {previous && (
          <HeaderLeftBtn onPress={navigation.goBack}>
            <Text style={{ fontSize: 16, color: colors.blue }}>Back</Text>
          </HeaderLeftBtn>
        )}
      </HeaderLeft>
      <HeaderTitle></HeaderTitle>
      {/* <TouchableOpacity onPress={() => setIsOpenProfileModal(true)}>
        <Text style={{ fontSize: 16, color: colors.blue }}>Profile</Text>
      </TouchableOpacity> */}
      <Text style={{ fontSize: 16, color: colors.blue }}>Profile</Text>
      <HeaderRight></HeaderRight>
    </Container>
  );
}
