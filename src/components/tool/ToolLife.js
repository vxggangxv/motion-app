import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { screenWidth } from 'utils/constants';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  /* background-color: lightgreen; */
`;

export default function ToolLife({ life = 0 }) {
  const fullWidth = screenWidth - 110;
  const widthOf10Img = 47;
  const widthOf10percent = widthOf10Img - fullWidth / 10;

  let leftOf10Lte = -(10 - life);
  if (life === 10) leftOf10Lte = 0;
  if (life === 0) leftOf10Lte = -10;

  let leftOf10Gte = -(100 - life);
  if (life === 100) leftOf10Gte = 0;

  return life <= 10 ? (
    <Container style={{ left: leftOf10Lte + '%' }}>
      <Image
        source={require('assets/images/contents/tool_progress_warning.png')}
        style={{ left: -widthOf10percent }}
      />
    </Container>
  ) : (
    <Container style={{ left: leftOf10Gte + '%' }}>
      <Image source={require('assets/images/contents/tool_progress_0.png')} style={{ width: 7 }} />
      <Image
        source={require('assets/images/contents/tool_progress_1.png')}
        style={{
          width: 49,
          height: 15,
        }}
        resizeMode="repeat"
        resizeMethod="resize"
      />
      <Image
        source={require('assets/images/contents/tool_progress_2.png')}
        style={{
          width: 27,
        }}
      />
      <Image
        source={require('assets/images/contents/tool_progress_3.png')}
        style={{
          width: fullWidth - 115,
          height: 15,
        }}
        resizeMode="repeat"
        resizeMethod="resize"
      />
      {/* {Array.from({ length: (fullWidth - 108) / 17 }).map((item, index) => {
        return <Image key={index} source={require('assets/images/contents/tool_progress_3.png')} />;
      })} */}
      <Image source={require('assets/images/contents/tool_progress_4.png')} style={{ width: 22 }} />
    </Container>
  );
}
