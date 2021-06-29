import React, { useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Pressable,
  View,
} from 'react-native';
import styled from 'styled-components';
import termsOfService from 'components/base/terms/termsOfService';
import AppText from 'components/common/AppText';
import { colors } from 'styles/utils';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Container = styled.View`
  position: relative;
`;
const TitleBox = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;
const ContentBox = styled.View`
  position: relative;
  justify-content: center;
  padding: 0 30px;
`;
const ContentSafeArea = styled(SafeAreaView)`
  position: relative;
  height: 420px;
`;
const ContentScroll = styled(ScrollView)`
  padding: 0 10px;
  background-color: white;
  border: 1px solid ${colors.blue};
  border-radius: 5px;
`;

export default function Terms({ type }) {
  const title = type === 'service' ? 'Terms and Conditions' : 'Privacy Policy';

  useEffect(() => {
    console.log('type', type);
  }, [type]);

  // return <Text>{termsOfService}</Text>;
  return (
    <Container>
      <TitleBox>
        <AppText>{title}</AppText>
      </TitleBox>
      <ContentBox>
        <TouchableWithoutFeedback>
          <ContentSafeArea>
            <ContentScroll>
              <Pressable>
                <AppText customStyle={{ fontSize: 12 }}>{termsOfService}</AppText>
              </Pressable>
            </ContentScroll>
          </ContentSafeArea>
        </TouchableWithoutFeedback>
      </ContentBox>
    </Container>
  );
}
