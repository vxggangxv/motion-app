import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import MachineStage from 'components/machine/MachineStage';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'styles/utils';
import AppText from 'components/common/AppText';
import _ from 'lodash';
import { screenWidth } from 'utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilStateLoadable } from 'recoil';
import { toolsQuery } from 'store/modules/serial';
import ScreenLayout from 'components/common/ScreenLayout';
import messaging from '@react-native-firebase/messaging';
import { messagingSerialTopicType } from 'utils/mapper';
import { useFocusEffect } from '@react-navigation/native';
import AppHeaderSide from 'components/base/header/AppHeaderSide';
import ToolLife from 'components/tool/ToolLife';

const Container = styled.View`
  /* flex: 1; */
  /* background-color: lightgreen; */
`;

const ToolListContainer = styled.View`
  margin-top: 20px;
  border: 0px ${colors.darkNavy};
  border-top-width: 6px;
`;
const ToolItem = styled.View`
  padding: 25px 35px;
  border: 0px ${colors.darkNavy};
  border-bottom-width: 3px;
`;
const ToolInfo = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
const ToolName = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const ProgressBox = styled.View`
  flex-direction: row;
  position: relative;
  height: 100%;
  background-color: ${colors.darkNavy};
  border-radius: 6px;
  overflow: hidden;
`;

const ScrollTopBtn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 15px;
  bottom: 30px;
  width: 40px;
  height: 40px;
  opacity: 0.5;
  background-color: white;
  border-radius: 25px;
`;

export default function ToolList({ navigation, route }) {
  // const serialNumber = route.params?.serialNumber || '21010056AAA';
  const serialNumber = route.params?.serialNumber;
  const deviceMode = route.params?.deviceMode || 0;
  const [
    {
      state: toolsStatus,
      contents: { list: toolList },
    },
    setTools,
  ] = useRecoilStateLoadable(toolsQuery(serialNumber));
  // ] = useRecoilStateLoadable(toolsQuery('21010046AAA'));
  const [isShowScrollTop, setIsShowScrollTop] = useState(false);
  const scrollRef = useRef(null);
  // const serialNumber = 'A';
  const stage = 'working';

  const onScroll = e => {
    // console.log('e.nativeEvent', e.nativeEvent);
    // const scrollX = e.nativeEvent.contentOffset.x;
    // 최초 0
    const scrollY = e?.nativeEvent?.contentOffset?.y;
    // const contentHeight = e?.nativeEvent?.contentSize?.height;
    const layoutHeight = e?.nativeEvent?.layoutMeasurement?.height;
    // const scrollViewHeight = contentHeight - layoutHeight;
    // console.log('positionY', positionY);
    // console.log(
    //   'scrollHeight',
    //   e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height,
    // );
    if (scrollY > layoutHeight) {
      setIsShowScrollTop(true);
    } else {
      setIsShowScrollTop(false);
    }
  };

  const onScrollTop = () => {
    scrollRef?.current?.scrollTo({ y: 0 });
  };

  // console.log('route.params?.serialNumber', route.params?.serialNumber);
  // request parameter
  // useEffect(() => {
  //   console.log('serialNumber', serialNumber);
  //   if (!!serialNumber) {
  //     // setToolsQuery('21010056AAA');
  //   }
  // }, [serialNumber]);

  useFocusEffect(
    React.useCallback(() => {
      if (!!toolList) setTools();
    }, []),
  );

  // // 실제 적용시 Machine 페이지 입장시 구독 시작
  useEffect(() => {
    // if (!!toolList) setTools();
    navigation.setOptions({
      headerLeft: props => {
        return (
          <AppHeaderSide
            {...props}
            side="left"
            onPress={() => {
              navigation.navigate('Machine');
            }}
          />
        );
      },
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
        console.log('-- from topics TooList', from);
        if (data.type === messagingSerialTopicType.toolUpdate) {
          setTools();
        }
      }
    });

    return () => {
      unscribe();
    };
  }, []);

  useEffect(() => {
    console.log('toolList', toolList);
  }, [toolList]);

  return (
    <Container>
      <SafeAreaView>
        {/* <ScrollView onScroll={onScroll}> */}
        <ScrollView onScroll={onScroll} scrollEventThrottle={16} ref={scrollRef}>
          {/* <Button
            title="go to machine list - puah"
            onPress={() => navigation.push('MachineList')}
          />
          <Button
            title="go to machine list - navigate"
            onPress={() => navigation.navigate('MachineList')}
          /> */}

          <MachineStage
            serialNumber={serialNumber}
            stage={deviceMode}
            img={require('assets/images/contents/tool_crop.png')}
          />

          <ToolListContainer>
            <ScreenLayout
              loading={toolsStatus !== 'hasValue'}
              hasDataLoading
              hasData={!!toolList?.length}
            >
              {!!toolList?.length &&
                toolList.map((item, idx) => (
                  <ToolItem key={item.idx}>
                    <ToolInfo>
                      <ToolName>
                        <AppText color="white" fontSize={15} fontWeight={500}>
                          {item.toolCode}
                        </AppText>
                        <AppText color="white" fontSize={12} customStyle={{ marginLeft: 20 }}>
                          {item.toolName}
                        </AppText>
                      </ToolName>
                      <AppText color="white" fontSize={12}>
                        {item.feature}mm
                      </AppText>
                    </ToolInfo>
                    <ProgressContainer>
                      <LinearGradient
                        colors={['#000D58', '#0E2081']}
                        style={{
                          alignContent: 'center',
                          justifyContent: 'center',
                          height: 24,
                          padding: 5,
                          borderRadius: 10,
                          width: screenWidth - 110,
                        }}
                      >
                        <ProgressBox>
                          <ToolLife life={item.life} />
                          {/* <LinearGradient
                            colors={['#dbc', '#9bc']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={{ width: `${item.life}%`, borderRadius: 10 }}
                          /> */}
                        </ProgressBox>
                      </LinearGradient>
                      <AppText color="white" fontSize={12}>
                        {item.life}%
                      </AppText>
                    </ProgressContainer>
                  </ToolItem>
                ))}
            </ScreenLayout>
          </ToolListContainer>
        </ScrollView>
      </SafeAreaView>
      {isShowScrollTop && (
        <ScrollTopBtn onPress={onScrollTop}>
          <Icon name="chevron-up" style={{ color: 'white', fontSize: 25 }} />
        </ScrollTopBtn>
      )}
    </Container>
  );
}
