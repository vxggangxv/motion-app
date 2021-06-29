import AppText from 'components/common/AppText';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StageBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const StageIcon = styled.View`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  background-color: ${props => props.color};
  border-radius: 3px;
`;

export default function StageBadge({ color, text }) {
  return (
    <StageBox>
      <StageIcon color={color} />
      <AppText color={color}>{text}</AppText>
    </StageBox>
  );
}
