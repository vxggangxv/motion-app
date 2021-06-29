import AppText from 'components/common/AppText';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, palette } from 'styles/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { WithLocalSvg } from 'react-native-svg';
import { useAlert } from 'store/modules/app';
import MachineStage from 'components/machine/MachineStage';
import { useRecoilStateLoadable } from 'recoil';
import { machineMessageQuery, machineQuery, ncFilesQuery, useSerial } from 'store/modules/serial';
import ScreenLayout from 'components/common/ScreenLayout';
import messaging from '@react-native-firebase/messaging';
import { messagingSerialTopicType } from 'utils/mapper';
import AppHeaderSide from 'components/base/header/AppHeaderSide';
import { deleteEnrolledMachine } from 'api/serial';
import { useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  /* background-color: lightgreen; */
`;

const horizentalPadding = 20;
const verticalPadding = 45;

const MachineStageBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
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

const NcFileContainer = styled.View`
  padding: 0 ${horizentalPadding}px;
  padding-bottom: ${verticalPadding}px;
  margin-top: 35px;
  border: 0px solid ${colors.darkNavy};
  border-bottom-width: 6px;
`;
const NcFileBox = styled.View`
  margin-top: 25px;
`;
const NcFileNameBox = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 3px;
`;
const NcFileProgressBox = styled.View`
  flex-direction: row;
  position: relative;
  height: 100%;
  background-color: ${colors.darkNavy};
  border-radius: 6px;
`;
const WaitingNcFileBox = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border: 0 dashed rgba(255, 255, 255, 0.5);
  border-top-width: 1px;
`;
const ToggleNcFileBtnBox = styled.View`
  /* bottom: -27.5px;
  right: 30px; */
  margin-left: auto;
  margin-right: 20px;
  margin-top: -30.5px;
  width: 55px;
  height: 55px;
  padding: 7px;
  border: 2px solid ${colors.darkNavy};
  border-radius: 30px;
`;
const ToggleNcFileBtn = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  border-radius: 25px;
`;

const InfoContainer = styled.View`
  padding: 10px ${horizentalPadding}px ${verticalPadding}px;
  border: 0px solid ${colors.darkNavy};
  border-bottom-width: 6px;
`;
const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => (props.isFirst ? 20 : 10)}px;
`;
const InfoItemName = styled(AppText)`
  width: 100px;
  font-size: 12px;
  color: white;
`;
const InfoItemValue = styled(AppText)`
  font-size: 12px;
  color: white;
  min-width: 70px;
  padding-bottom: 5px;
  padding-left: 10px;
  border: 0 solid ${colors.blue};
  border-bottom-width: 1px;
`;
const ToolLinkBtn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 38px;
  margin-top: 50px;
  background-color: ${colors.blue};
  border-radius: 20px;
`;

const MessageContainer = styled.View`
  padding: ${verticalPadding}px ${horizentalPadding}px;
  border: 0px solid ${colors.darkNavy};
  border-bottom-width: 6px;
`;
const MessageBox = styled.View`
  padding: 15px 20px;
  margin-top: 25px;
  border: 1px solid ${props => (props.error ? colors.stageError : 'white')};
  border-radius: 8px;
`;

const DeleteMachineContainer = styled.View`
  align-items: center;
  padding: 35px 0;
`;

export default function Machine({ route, navigation }) {
  // deviceMode : int (0: off, 1: ready, 2: working, 3: error )
  // 0, 1은 forground,
  // toolMode : int (0: wet, 1: dry)
  // const serialNumber = route.params?.serialNumber || '21010056AAA';
  const serialNumber = route.params?.serialNumber;
  // const setMachineQuery = useSetRecoilState(machineQueryState);
  const [
    {
      state: machineStatus,
      contents: { serialData: machineData },
    },
    setMachine,
  ] = useRecoilStateLoadable(machineQuery(serialNumber));
  const [
    {
      state: machineMessageStatus,
      contents: { list: machineMessageList },
    },
    setMachineMessage,
  ] = useRecoilStateLoadable(machineMessageQuery(serialNumber));
  const [
    {
      state: ncFilesStatus,
      contents: { ncFileList: ncFilesData },
    },
    setNcFiles,
  ] = useRecoilStateLoadable(ncFilesQuery(serialNumber));
  const [isShowWaitingNcFile, setIsShowWaitingNcFile] = useState(false);
  const { addAlert } = useAlert();

  // const deviceMode = machineData?.deviceMode;
  const ncFileList = ncFilesData || [];
  const currentNcFile = ncFileList[0];
  const waitingNcFileList = ncFileList?.filter((item, index) => index !== 0);
  const currentTool = machineData?.currentTool;

  useEffect(() => {
    console.log('currentNcFile', currentNcFile);
  }, [currentNcFile]);

  const currentNcFileProgress = useMemo(() => {
    if (ncFilesStatus === 'hasValue' || machineStatus === 'hasValue') {
      return currentNcFile?.progress || 0;
    }
  }, [ncFilesStatus === 'hasValue', machineStatus === 'hasValue']);
  // 임시
  // const ncFileName = 'DOF TEST SOLID A3 18T_2102251022';
  // const ncFileProgress = 78;
  // const milingMode = 'Dry';
  // const currentTool = 'T10';
  const message = `Took Broken\nTook Broken`;

  const toggleShowWaitingNcFile = () => {
    setIsShowWaitingNcFile(draft => !draft);
  };

  const goToToolList = () => {
    navigation.navigate('ToolList', { serialNumber, deviceMode: machineData?.deviceMode });
  };

  const onDeleteMachine = () => {
    addAlert({
      visible: true,
      renderContent: 'Are you sure you want to delete the registered machine data?',
      okText: 'OK',
      onPress: async () => {
        // request api
        try {
          await deleteEnrolledMachine(serialNumber);
          navigation.navigate('MachineList');
        } catch (error) {}
      },
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setMachine();
      setNcFiles();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: props => {
        return (
          <AppHeaderSide
            {...props}
            side="left"
            onPress={() => {
              messaging()
                .unsubscribeFromTopic(serialNumber)
                .then(() => console.log('Unsubscribe', serialNumber));

              navigation.navigate('MachineList');
            }}
          />
        );
      },
    });
  }, []);

  // 실제 적용시 Machine 페이지 입장시 구독 시작
  useEffect(() => {
    messaging()
      .subscribeToTopic(serialNumber)
      .then(() => {
        console.log(`Subscribe ${serialNumber}`);
      });

    const unscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('Message handled in the foreground machine!', remoteMessage);
      // 조건문 적용
      // topic, serialNumber 일치 확인
      const data = remoteMessage?.data;
      const from = remoteMessage.from;
      console.log('data', data);
      if (from === `/topics/${serialNumber}` && !!data) {
        console.log('-- from topics Machine', from);
        if (data.type === messagingSerialTopicType.deviceUpdate) {
          console.log(messagingSerialTopicType.deviceUpdate);
          setMachine();
        }
        if (data.type === messagingSerialTopicType.ncfileUpdate) {
          console.log(messagingSerialTopicType.ncfileUpdate);
          setNcFiles();
        }
        if (data.type === messagingSerialTopicType.toolUpdate) {
          console.log(messagingSerialTopicType.toolUpdate);
          setMachine();
        }
        if (data.type === messagingSerialTopicType.msgUpdate) {
          console.log(messagingSerialTopicType.msgUpdate);
          setMachineMessage();
        }
      }
    });

    return () => {
      // messaging()
      //   .unsubscribeFromTopic(serialNumber)
      //   .then(() => {
      //     console.log(`Unsubscribe ${serialNumber}`);
      //   });
      unscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (ncFilesStatus === 'hasValue') {
  //     setCurrentNcFileProgress(currentNcFile?.progress);
  //   }
  // }, [ncFilesStatus === 'hasValue']);

  // useEffect(() => {
  //   console.log('${currentNcFile?.progress / 100}', `${currentNcFile?.progress / 100}`);
  // }, []);

  // useEffect(() => {
  //   console.log('navigation', navigation);
  // }, [navigation]);

  // request parameter
  // useEffect(() => {
  //   console.log('serialNumber', serialNumber);
  //   if (!!serialNumber) {
  //     setMachineQuery(serialNumber);
  //   }
  // }, [serialNumber]);

  // useEffect(() => {
  //   console.log('machineData', machineData);
  // }, [machineData]);

  // useEffect(() => {
  //   console.log('waitingNcFileList', waitingNcFileList);
  // }, [waitingNcFileList]);

  return (
    <ScreenLayout loading={machineStatus !== 'hasValue'} hasDataLoading hasData={machineData}>
      <Container>
        <SafeAreaView>
          <ScrollView>
            <MachineStage serialNumber={serialNumber} stage={machineData?.deviceMode} />

            <View>
              <NcFileContainer>
                <AppText fontSize={16} color="white">
                  NC File
                </AppText>
                {!!currentNcFile && (
                  <NcFileBox>
                    <NcFileNameBox>
                      <AppText fontSize={12} color="white" customStyle={{ width: '85%' }}>
                        {currentNcFile?.fileName}
                      </AppText>
                      <AppText color="white">{currentNcFileProgress}%</AppText>
                    </NcFileNameBox>
                    <LinearGradient
                      colors={['#000D58', '#0E2081']}
                      style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        height: 20,
                        padding: 5,
                        borderRadius: 10,
                        marginTop: 20,
                      }}
                    >
                      <NcFileProgressBox>
                        <View
                          style={{
                            width: `${currentNcFileProgress}%`,
                          }}
                        >
                          <LinearGradient
                            colors={['#fff', '#0697CB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                              flex: 1,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                      </NcFileProgressBox>
                    </LinearGradient>
                  </NcFileBox>
                )}
                {isShowWaitingNcFile && !!waitingNcFileList?.length && (
                  <WaitingNcFileBox>
                    {waitingNcFileList.map((item, idx) => (
                      <View
                        key={item.ncFileIdx}
                        style={{
                          marginTop: idx !== 0 ? 15 : 0,
                        }}
                      >
                        <NcFileNameBox>
                          <AppText fontSize={12} color="white" customStyle={{ width: '85%' }}>
                            {item.fileName}
                          </AppText>
                        </NcFileNameBox>
                        <LinearGradient
                          colors={['#000D58', '#0E2081']}
                          style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: 20,
                            padding: 5,
                            borderRadius: 10,
                            marginTop: 20,
                          }}
                        >
                          <NcFileProgressBox>
                            <View
                              style={{ flex: 1, borderRadius: 10, backgroundColor: '#3B3B3B' }}
                            />
                          </NcFileProgressBox>
                        </LinearGradient>
                      </View>
                    ))}
                  </WaitingNcFileBox>
                )}
              </NcFileContainer>

              {!!waitingNcFileList?.length && (
                <ToggleNcFileBtnBox>
                  <ToggleNcFileBtn
                    color={!isShowWaitingNcFile ? colors.blue : palette.grayB1}
                    onPress={toggleShowWaitingNcFile}
                  >
                    {!isShowWaitingNcFile ? (
                      <Icon name="chevron-down" style={{ color: 'white', fontSize: 25 }} />
                    ) : (
                      <Icon name="chevron-up" style={{ color: 'white', fontSize: 25 }} />
                    )}
                  </ToggleNcFileBtn>
                </ToggleNcFileBtnBox>
              )}
            </View>

            <InfoContainer>
              <AppText color="white" fontSize={16}>
                Information
              </AppText>
              <InfoItem isFirst>
                <InfoItemName>ㄴ Miling Mode</InfoItemName>
                <InfoItemValue>{machineData?.toolMode === 0 ? 'Wet' : 'Dry'}</InfoItemValue>
              </InfoItem>
              <InfoItem>
                <InfoItemName>ㄴ Current Tool</InfoItemName>
                <InfoItemValue>{currentTool?.toolCode}</InfoItemValue>
              </InfoItem>
              <ToolLinkBtn onPress={goToToolList}>
                <AppText fontStyle="italic" fontWeight={500} color="white" fontSize={15}>
                  Tool Information{' '}
                </AppText>
                <WithLocalSvg
                  asset={require('assets/images/icons/icon_arrow_forward_long.svg')}
                  style={{ marginLeft: 5 }}
                />
              </ToolLinkBtn>
            </InfoContainer>

            <MessageContainer>
              <AppText color="white" fontSize={16}>
                Message
              </AppText>
              <MessageBox error={machineData?.deviceMode === 3}>
                <AppText color="white" fontSize={14}>
                  {machineMessageStatus === 'hasValue' && machineMessageList[0]?.msg}
                </AppText>
              </MessageBox>
            </MessageContainer>

            <DeleteMachineContainer>
              <AppText fontSize={12} color="white">
                Delete this miling machine?
              </AppText>
              <TouchableOpacity onPress={onDeleteMachine}>
                <AppText
                  fontSize={13}
                  fontWeight={500}
                  fontStyle="italic"
                  color="white"
                  customStyle={{ textDecorationLine: 'underline', marginTop: 10 }}
                >
                  Delete
                </AppText>
              </TouchableOpacity>
            </DeleteMachineContainer>
          </ScrollView>
        </SafeAreaView>
      </Container>
    </ScreenLayout>
  );
}
