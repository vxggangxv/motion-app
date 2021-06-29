import AppText from 'components/common/AppText';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { convertMachineStage } from 'utils/utils';
import StageBadge from './StageBadge';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  border: 1px rgba(0, 0, 0, 0.4);
  border-right-width: 0;
  border-top-color: rgba(255, 255, 255, 0.13);
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  shadow-color: black;
  shadow-opacity: 0.2;
  elevation: 5;
  background-color: #011b69;
`;
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

export default function MachineStage({ serialNumber, stage, img }) {
  const { stageColor, stageText } = convertMachineStage(stage);

  return (
    <Container>
      <Image source={img || require('assets/images/contents/miling_machine_crop.png')} />
      <View style={{ flex: 1, paddingLeft: 15, paddingRight: 40 }}>
        <AppText fontSize={12} color="white">
          SerialNumber
        </AppText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <AppText fontSize={15} color="white">
            {serialNumber}
          </AppText>
          <StageBadge color={stageColor} text={stageText} />
          {/* <StageBox>
            <StageIcon color={stageColor} />
            <AppText color={stageColor}>{stageText}</AppText>
          </StageBox> */}
        </View>
      </View>
    </Container>
  );
}
