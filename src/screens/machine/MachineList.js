import React, { useEffect, useState } from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ScreenLayout from 'components/common/ScreenLayout';
import { useRecoilState, useRecoilValueLoadable, useResetRecoilState } from 'recoil';
import AppText from 'components/common/AppText';
import { WithLocalSvg } from 'react-native-svg';
import { screenHeight, screenWidth } from 'utils/constants';
import { colors, palette } from 'styles/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import AppModal from 'components/common/AppModal';
import useInput from 'hooks/useInput';
import RegisterMachine from 'components/machine/RegisterMachine';
import MachineItem from 'components/machine/MachineItem';
// import MachineItem from '../../components/machine/MachineItem';
import Profile from 'components/profile/Profile';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { photosState } from 'store/modules/support';
import { machinesQuery, machinesQueryState } from 'store/modules/serial';
import { createEnrolledMachine } from 'api/serial';
import { useRnFocusEffect } from 'utils/hooks';

const Container = styled.View`
  flex: 1;
  margin-top: 5px;
  /* background-color: yellow; */
`;

const CommonMachineBoxStyle = styled.View`
  background-color: #011b69;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-left-width: 0;
  border-top-color: rgba(255, 255, 255, 0.13);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  shadow-color: black;
  shadow-opacity: 0.2;
  elevation: 5;
  /* shadow-offset: 0;
shadow-opacity: 0.25;
shadow-radius: 10px; */
`;

const NewMachineContainer = styled(TouchableOpacity)`
  position: relative;
  /* background-color: yellow; */
`;
const NewMachineBox = styled(CommonMachineBoxStyle)`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${screenWidth - 40}px;
  height: 140px;
  padding-right: 45px;
  /* background-color: yellow; */
`;
const NewBtnBox = styled.View`
  position: absolute;
  top: 50%;
  margin-top: -36.5px;
  right: -36.5px;
  padding: 10px;
  background-color: ${colors.navy};
  border-radius: 40px;
`;
const NewBtn = styled.View`
  align-items: center;
  justify-content: center;
  width: 53px;
  height: 53px;
  background-color: ${colors.blue};
  border-radius: 40px;
  shadow-color: black;
  shadow-opacity: 0.2;
  elevation: 5;
`;
const MoreMachineContainer = styled(TouchableOpacity)`
  /* background-color: yellow; */
`;
const MoreMachineBox = styled(CommonMachineBoxStyle)`
  /* align-items: center; */
  justify-content: center;
  position: relative;
  width: ${screenWidth - 40}px;
  height: 75px;
  padding-left: 50px;
`;
const MoreBtnBox = styled.View`
  position: absolute;
  right: -25px;
  bottom: -25px;
  padding: 10px;
  background-color: ${colors.navy};
  border-radius: 30px;
`;
const MoreBtn = styled.View`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${colors.navy};
  border: 1px solid white;
  border-radius: 30px;
  shadow-color: black;
  shadow-opacity: 0.2;
  elevation: 5;
`;

const SupportActionBox = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 30px;
  left: 0;
  height: 57px;
`;
const SupportToggleBtn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 100%;
  background-color: ${colors.blue};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

const SupportCommonBtn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 57px;
  height: 100%;
  margin-left: 10px;
  background-color: white;
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

export default function MachineList(props) {
  const navigation = useNavigation();
  const [machines, setMachines] = useState([]);
  // const resetMachinesQueryValue = useResetRecoilState(machinesQueryState);
  const [refreshing, setRefreshing] = useState(false);
  const [machinesQueryValue, setMachinesQueryValue] = useRecoilState(machinesQueryState);
  const {
    state: machinesStatus,
    contents: { list: machinesData, pagingData: machinesPagingData },
  } = useRecoilValueLoadable(machinesQuery);
  // const machineList = [];
  // const machineList = [
  //   { id: 'A', stage: 'ready' },
  //   { id: 'B', stage: 'working' },
  //   { id: 'C', stage: 'error' },
  // ];
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  // const serialNumber = useInput('21010057AAA');
  const serialNumber = useInput('');
  const [isShowSupportAction, setIsShowSupportAction] = useState(false);
  // const checkSerialNumber = useCheckSetInput(new Set([]));
  const checkSerialNumber = useInput('');
  //
  const resetPhotos = useResetRecoilState(photosState);

  const resetSupportAction = () => {
    setIsShowSupportAction(false);
    checkSerialNumber.setValue('');
  };

  const goToSupport = () => {
    // const checkStage = machineList.find(item => item.id === checkSerialNumber.value)?.stage;
    const checkStage = machines.find(
      item => item.serialNumber === checkSerialNumber.value,
    )?.deviceMode;
    resetSupportAction();
    resetPhotos([]);
    navigation.navigate('Support', {
      serialNumber: checkSerialNumber.value,
      deviceMode: machinesData?.find(item => item.serialNo === checkSerialNumber.value)?.deviceMode,
    });
  };

  const onRegisterMachine = async () => {
    if (!serialNumber.value) return;
    // request api
    console.log('serialNumberData', serialNumber.value);
    // TODO: request api list when success
    // setTodos()
    // TODO: pass on error to RegisterMachine when error
    try {
      await createEnrolledMachine(serialNumber.value);
      setMachinesQueryValue({ page: 1 });
    } catch (error) {}
  };

  // set machinesQuery, api data  전달
  const getMachines = (config = {}) => {
    const { first, after, refresh } = config;
    // console.log('setMachinesQueryValue', setMachinesQueryValue);
    // if (refresh) resetMachinesQueryValue();
    if (first || refresh) {
      return setMachinesQueryValue({ page: 1 });
    }
    if (after) {
      const nextPage = machinesQueryValue?.page + 1;
      if (!(nextPage <= machinesPagingData?.totalPage)) return;
      return setMachinesQueryValue(draft => {
        return { page: nextPage };
      });
    }
  };

  // params 에 따른 변경 데이터, state에 적용
  // useEffect(() => {
  //   if (machinesStatus === 'hasValue') {
  //     console.log('machinesQueryValue?.page', machinesQueryValue?.page);
  //     console.log('machinesStatus', machinesStatus);
  //     if (machinesQueryValue?.page === 1) {
  //       setMachines(machinesData);
  //     } else {
  //       if (!!machines?.length) setMachines(draft => [...draft, ...machinesData]);
  //     }
  //   }
  // }, [machinesStatus === 'hasValue', machinesQueryValue?.page]);

  // initialRoute의 경우 useEffect setQuery로 Get 해줘야 Nav변화에 반응
  useFocusEffect(
    React.useCallback(() => {
      getMachines({ first: true });
    }, []),
  );

  // useRnFocusEffect(() => {
  //   console.log('machines', machines);
  // }, [machines]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('machines', machines);
  //   }, [machines]),
  // );

  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      // Do something when the screen is focused
      if (machinesStatus === 'hasValue') {
        console.log('machinesQueryValue?.page', machinesQueryValue?.page);
        console.log('machinesStatus', machinesStatus);
        if (machinesQueryValue?.page === 1) {
          setMachines(machinesData);
        } else {
          if (!!machines?.length) setMachines(draft => [...draft, ...machinesData]);
        }
      }
      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [machinesStatus === 'hasValue', machinesQueryValue?.page]),
  );

  // init
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsOpenProfileModal(true)}>
          <Icon
            name="settings-sharp"
            style={{ color: 'white', fontSize: 20, marginHorizontal: 15 }}
          />
        </TouchableOpacity>
      ),
    });

    // navigation.navigate('WelcomeIn');
    // return () => {
    //   setIsShowSupportAction(false);
    //   checkSerialNumber.setValue('');
    // };
  }, []);

  // useEffect(() => {
  //   console.log('machines', machines);
  //   console.log('machines', machines.length);
  // }, [machines]);

  // useEffect(() => {
  //   console.log('todos', todos);
  // }, [todos]);
  // useEffect(() => {
  //   console.log('machinesStatus', machinesStatus);
  // }, [machinesStatus]);

  // if (machinesStatus !== 'hasValue') return null;
  // return <Text style={{ color: 'white' }}>MachineList</Text>;
  return (
    <>
      <AppModal
        visible={isOpenRegisterModal}
        renderContent={<RegisterMachine serialNumber={serialNumber} />}
        onClose={() => setIsOpenRegisterModal(false)}
        onPress={onRegisterMachine}
        okText="Register"
        disabledOk={!serialNumber.value}
      />
      <AppModal
        visible={isOpenProfileModal}
        hasDefaultStyle={false}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        swipeDirection={['right']}
        renderContent={<Profile onClose={() => setIsOpenProfileModal(false)} />}
        onClose={() => setIsOpenProfileModal(false)}
      />
      <Container>
        {!machines?.length ? (
          <NewMachineContainer onPress={() => setIsOpenRegisterModal(true)}>
            <NewMachineBox>
              <Image source={require('assets/images/contents/miling_machine_dim.png')} />
              <AppText fontSize={12} color="white">
                Upload Miling Machine
              </AppText>
              <WithLocalSvg asset={require('assets/images/icons/icon_arrow_forward_long.svg')} />
              <NewBtnBox>
                <NewBtn>
                  <Icon
                    name="add-outline"
                    style={{
                      fontSize: 40,
                      color: 'white',
                      right: -1,
                    }}
                  />
                </NewBtn>
              </NewBtnBox>
            </NewMachineBox>
          </NewMachineContainer>
        ) : (
          <>
            <View
              style={{
                height:
                  machines.length <= (screenHeight - 315) / 145
                    ? 145 * machines.length
                    : screenHeight - 315,
                marginBottom: 10,
              }}
            >
              <ScreenLayout
                loading={machinesStatus !== 'hasValue'}
                hasDataLoading={true}
                hasData={!!machines?.length}
              >
                {/* {!!machines?.length &&
                machines.map((item, idx) => (
                  <MachineItem
                    key={idx}
                    index={idx + 1}
                    {...item}
                    isShowSupportAction={isShowSupportAction}
                    checkSerialNumber={checkSerialNumber}
                  />
                ))} */}
                <FlatList
                  // onEndReachedThreshold={0.02}
                  onEndReached={() => getMachines({ after: true })}
                  refreshing={refreshing}
                  onRefresh={() => getMachines({ refresh: true })}
                  style={{ width: '100%' }}
                  showsVerticalScrollIndicator={false}
                  data={machines}
                  keyExtractor={(item, index) => '' + index}
                  renderItem={({ item, index }) => (
                    <MachineItem
                      key={index}
                      index={index + 1}
                      {...item}
                      isShowSupportAction={isShowSupportAction}
                      checkSerialNumber={checkSerialNumber}
                    />
                  )}
                />
              </ScreenLayout>
            </View>

            <MoreMachineContainer onPress={() => setIsOpenRegisterModal(true)}>
              <MoreMachineBox>
                <AppText fontSize={12} color="white">
                  Upload Miling Machine
                </AppText>
                <MoreBtnBox>
                  <MoreBtn>
                    <Icon
                      name="add-outline"
                      style={{
                        fontSize: 30,
                        color: 'white',
                        right: -1,
                      }}
                    />
                  </MoreBtn>
                </MoreBtnBox>
              </MoreMachineBox>
            </MoreMachineContainer>
          </>
        )}

        <SupportActionBox>
          <SupportToggleBtn
            onPress={e => {
              if (!isShowSupportAction) setIsShowSupportAction(true);
            }}
            disabled={isShowSupportAction}
          >
            <WithLocalSvg asset={require('assets/images/icons/icon_paper_plane.svg')} />
            <AppText
              color="white"
              fontSize={12}
              // fontWeight={500}
              // customStyle={{ letterSpacing: 1, marginLeft: 10 }}
            >
              Support
            </AppText>
          </SupportToggleBtn>
          {isShowSupportAction && (
            <>
              <SupportCommonBtn onPress={goToSupport} disabled={!checkSerialNumber.value}>
                <Icon name="checkmark" style={{ fontSize: 38, color: colors.blue }} />
              </SupportCommonBtn>
              <SupportCommonBtn onPress={resetSupportAction}>
                <Icon name="close-outline" style={{ fontSize: 39, color: palette.grayB1 }} />
              </SupportCommonBtn>
            </>
          )}
        </SupportActionBox>
      </Container>
    </>
  );
}

// <ScreenLayout loading={loading}>
//   <Text style={{ color: 'white' }}>MachineList</Text>
// </ScreenLayout>

// <FlatList
//   onEndReachedThreshold={0.02}
//   onEndReached={() =>
//     fetchMore({
//       variables: {
//         offset: data?.seeFeed?.length,
//       },
//     })
//   }
//   refreshing={refreshing}
//   onRefresh={refresh}
//   style={{ width: "100%" }}
//   showsVerticalScrollIndicator={false}
//   data={data?.seeFeed}
//   keyExtractor={(photo) => "" + photo.id}
//   renderItem={renderPhoto}
// />
