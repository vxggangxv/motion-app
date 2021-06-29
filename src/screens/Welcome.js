import React, { useEffect, useState } from 'react';
import AppText from 'components/common/AppText';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/utils';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Ionicons } from '@expo/vector-icons';
import { WithLocalSvg, SvgXml, SvgCssUri } from 'react-native-svg';
// import craft_motion_app from 'assets/images/contents/craft_motion_app.png';
// import motion_app_mark from 'assets/images/contents/motion_app_mark.png';
// import craft5x from 'assets/images/contents/craft5x.svg';
// import motion_app from 'assets/images/contents/motion_app.svg';
// import dof_mark from 'assets/images/contents/dof_mark.svg';
import { screenWidth } from 'utils/constants';
import { fontSizeRatio } from 'utils/utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: white;
`;

const Main = styled.Image`
  position: relative;
  width: 100%;
  flex: 79%;
`;

const LogoContainer = styled.View`
  position: relative;
  top: -10.5%;
  width: 100%;
  flex: 21%;
  align-items: flex-end;
`;

const LogoBox = styled.View`
  position: relative;
  width: 83%;
  height: 162px;
  align-items: flex-start;
  /* padding: 0 12%; */
  background-color: #fff;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  elevation: 5;

  shadow-offset: 0;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
`;

const MotionApp = styled.View`
  position: relative;
  width: 168px;
  margin-left: 34px;
  margin-top: 34px;
`;

const GetStarted = styled.TouchableOpacity`
  position: absolute;
  bottom: -18px;
  right: 0;
  width: 60%;
  height: 54px;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: ${colors.blue};
`;

const LoginLink = styled.Text``;

const ForwordArrow = styled(Icon)`
  position: relative;
  margin-left: 15px;
  margin-right: -10px;
  color: #fff;
`;

export default function Welcome({ navigation }) {
  const goToLogIn = () => navigation.navigate('LogIn');

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <Main source={require('assets/images/contents/main_bg.png')} resizeMode="cover" />
      <LogoContainer>
        <LogoBox>
          <MotionApp>
            <Image
              source={require('assets/images/contents/craft_motion_app.png')}
              resizeMode="contain"
            />
          </MotionApp>
          <GetStarted
            onPress={() => {
              console.log('press');
              goToLogIn();
            }}
          >
            <AppText customStyle={{ fontSize: 15, color: '#fff' }}>Get Started</AppText>
            <ForwordArrow
              name="arrow-forward"
              style={{
                fontSize: 19,
              }}
            />
          </GetStarted>
        </LogoBox>
      </LogoContainer>
    </Container>
  );
}
