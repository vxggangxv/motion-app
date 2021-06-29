import React from 'react';
import AppText from 'components/common/AppText';
import { TouchableOpacity, Image, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { screenWidth } from 'utils/constants';
import { colors } from 'styles/utils';
import { useNavigation } from '@react-navigation/core';
import { convertMachineStage } from 'utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  margin-top: ${props => (!props.isFirst ? 20 : 0)}px;
`;
const Card = styled(TouchableOpacity)`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${screenWidth * 0.85}px;
  height: 125px;
  padding-left: 25px;
  border-radius: 7px;
  background-color: white;
  opacity: ${props => (props.disabled ? 0.8 : 1)};
`;
const CardInfo = styled.View``;

const StageBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;
const StageIcon = styled.View`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  background-color: ${props => props.color};
  border-radius: 3px;
`;

// const IconContainer = styled.View`
const IconContainer = styled(Pressable)`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(-15px, -17px);
  width: 34px;
  height: 34px;
  border: 2.5px ${props => (props.checked ? 'white' : colors.darkNavy)};
  border-radius: 20px;
  background-color: ${props => (props.checked ? colors.blue : 'white')};
`;
const IconBox = styled.View`
  align-items: center;
  justify-content: center;
  /* background-color: white; */
  /* border-radius: 20px; */
`;

export default function MachineItem({
  index,
  serialNo,
  deviceMode,
  isShowSupportAction,
  checkSerialNumber,
}) {
  const navigation = useNavigation();
  const checked = serialNo === checkSerialNumber.value;
  // const checked = checkSerialNumber.value?.has(serialNo);
  const { stageColor, stageText } = convertMachineStage(deviceMode);
  // const setMachine = useRecoil(machineQuery(serialNumber));

  const goToMachine = () => {
    navigation.navigate('Machine', { serialNumber: serialNo });
  };

  // const isFirstCard = index === 1

  return (
    <Container isFirst={index === 1}>
      <AppText fontSize={12} color="#A8B0CB" customStyle={{}}>
        {isShowSupportAction ? '' : index}
      </AppText>
      <Card onPress={goToMachine} disabled={isShowSupportAction}>
        <CardInfo>
          <AppText fontSize={12}>Serial Number</AppText>
          <AppText fontSize={15} customStyle={{ marginTop: 5 }}>
            {serialNo}
          </AppText>
          <StageBox>
            <StageIcon color={stageColor} />
            <AppText color={stageColor}>{stageText}</AppText>
          </StageBox>
        </CardInfo>
        <Image source={require('assets/images/contents/miling_machine.png')} />
      </Card>
      {isShowSupportAction && (
        <IconContainer checked={checked} onPress={() => checkSerialNumber.setValue(serialNo)}>
          <IconBox>
            <Icon
              name="checkmark-sharp"
              style={{
                fontSize: 22,
                color: checked ? 'white' : colors.darkNavy,
                borderRadius: 4,
              }}
            />
          </IconBox>
        </IconContainer>
      )}
    </Container>
  );
}
