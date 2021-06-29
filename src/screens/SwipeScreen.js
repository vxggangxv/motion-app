import termsOfService from 'components/base/terms/termsOfService';
import SwipeGesture from 'components/common/gesture/SwipeGesture';
import OriginModal from 'components/common/modal/OriginModal';
import RegisterMachine from 'components/machine/RegisterMachine';
import React, { useState } from 'react';
import { Text, View, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import GestureRecognizer from 'utils/GestureRecognizer';

export default function Jun(props) {
  // const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(true);

  const swipeConfig = {
    velocityThreshold: 0,
    // gestureIsClickThreshold: 50,
  };
  const onSwipeComplete = () => {
    console.log('onSwipeComplete');
  };

  return (
    <GestureRecognizer
      onSwipe={() => console.log('swipe')}
      // onSwipe={(direction, state) => onSwipe(direction, state)}
      style={{
        width: 200,
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'red',
      }}
    >
      {/* <AppText>아아</AppText> */}
      {/* <View style={{ flex: 1, backgroundColor: 'white' }}>
              <AppText>아아</AppText>
            </View> */}
    </GestureRecognizer>
    // <View
    //   style={{
    //     flex: 1,
    //     // width: '100%',
    //     alignContent: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'white',
    //   }}
    // >
    //   <SwipeGesture
    //     style={{
    //       width: 200,
    //       height: 200,
    //       marginLeft: 'auto',
    //       marginRight: 'auto',
    //       backgroundColor: 'red',
    //     }}
    //   >
    //     <TouchableOpacity style={{ zIndex: 1 }} onPress={() => console.log('click')}>
    //       <Text>SwipeBox</Text>
    //     </TouchableOpacity>
    //   </SwipeGesture>
    // </View>
  );
}
