import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: lightgreen;
`;

export default function ConfirmPhoto(props) {
  return (
    <Container>
      <Text>ConfirmPhoto</Text>
    </Container>
  );
}
