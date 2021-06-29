import React, { useEffect, useState } from 'react';
import { Text, View, Animated, TouchableOpacity, Alert, Image } from 'react-native';
import styled from 'styled-components';
import messaging from '@react-native-firebase/messaging';
import FirebaseMessageContainer from 'containers/FirebaseMessageContainer';
import { useRecoilValue } from 'recoil';
import { todoQuery } from 'store/modules/todo';

export default function Jun(props) {
  // const todo = useRecoilValue(todoQuery(1));

  // return <View />;
  return (
    <View style={{ backgroundColor: 'white', paddingVertical: 20 }}>
      <Image
        source={require('assets/images/contents/tool_progress_3.png')}
        style={{ resizeMode: 'repeat', width: 17, height: 15 }}
        // source={require('assets/images/contents/craft_motion_app.png')}
        // style={{ resizeMode: 'repeat', width: 17, height: 150 }}
        // style={{ resizeMode: 'repeat', width: 169, height: 60 }}
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'red',
        }}
        resizeMode="repeat"
        resizeMethod="resize"
      />
    </View>
  );
}
