import AppText from 'components/common/AppText';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/utils';

const StageIconBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const StageIcon = styled.View`
  width: ${props => props.size};
  height: ${props => props.size};
  margin-right: 8px;
  background-color: ${props => props.color};
  border-radius: 3px;
`;

export default React.memo(function StageIcon({ style, stage, hasText = true, size = 14 }) {
  let stageColor = colors.stageReady;

  let stageText = 'Off-line';
  if (stage === 'ready') {
    stageColor = colors.stageReady;
    stageText = 'Ready';
  } else if (stage === 'working') {
    stageColor = colors.stageWorking;
    stageText = 'Working';
  } else {
    stageColor = colors.stageOff;
    stageText = 'Off-line';
  }

  return (
    <StageIconBox style={{ ...style }}>
      <StageIcon color={stageColor} size={size} />
      {hasText && <AppText color={stageColor}>{stageText}</AppText>}
    </StageIconBox>
  );
});
