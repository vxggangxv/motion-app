import React, { Component, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'utils/GestureRecognizer';

export default function SwipeGesture({
  children,
  config = {},
  style,
  direction,
  onSwipeGestureUp = () => {},
  onSwipeGestureDown = () => {},
  onSwipeGestureLeft = () => {},
  onSwipeGestureRight = () => {},
  onSwipeGestureComplete = () => {},
}) {
  // swipe 공통
  const handleSwipe = (direction, state) => {
    // console.log(direction, state);
    // console.log('direction', direction);
    // onSwipeGestureComplete();
  };
  const handleSwipeUp = state => {
    onSwipeGestureUp();
    // if (direction.includes('up')) {
    //   // todo
    // }
  };
  const handleSwipeDown = state => {
    onSwipeGestureDown();
    // if (direction.includes('down')) {
    //   // todo
    // }
  };
  const handleSwipeLeft = state => {
    onSwipeGestureLeft();
    // if (direction.includes('left')) {
    //   // todo
    // }
  };
  const handleSwipeRight = state => {
    onSwipeGestureRight();
    // if (direction.includes('right')) {
    //   // todo
    // }
  };
  // const onSwipeUp = () => {};
  // const onSwipeDown = () => {};
  // const onSwipeLeft = () => {};
  // const onSwipeRight = () => {};

  const swipeConfig = {
    // velocityThreshold: 0.3, // 속도
    velocityThreshold: 0, // 속도
    directionalOffsetThreshold: 80, // 최대 인식 누적거리, 벗어날 경우 인식X
    gestureIsClickThreshold: 5, // 클릭으로 인식되는 거리, 값을 넘어야 gesture로 인식
    ...config,
  };

  // useEffect(() => {
  //   console.log('mounted SwipeGesture');
  // }, []);

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => handleSwipe(direction, state)}
      onSwipeUp={state => handleSwipeUp(state)}
      onSwipeDown={state => handleSwipeDown(state)}
      onSwipeLeft={state => handleSwipeLeft(state)}
      onSwipeRight={state => handleSwipeRight(state)}
      config={swipeConfig}
      style={{
        ...style,
      }}
    >
      <Pressable>{children}</Pressable>
    </GestureRecognizer>
  );
  // return ('hi')
  //  return (
  //   <GestureRecognizer
  //     onSwipe={(direction, state) => onSwipe(direction, state)}
  //     onSwipeUp={state => onSwipeUp(state)}
  //     onSwipeDown={state => onSwipeDown(state)}
  //     onSwipeLeft={state => onSwipeLeft(state)}
  //     onSwipeRight={state => onSwipeRight(state)}
  //     config={config}
  //     style={{
  //       ...style,
  //       flex: 1,
  //       backgroundColor: this.state.backgroundColor,
  //     }}
  //   >
  //     {children}
  //   </GestureRecognizer>
}

// class SwipeGesture extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       myText: "I'm ready to get swiped!",
//       gestureName: 'none',
//       backgroundColor: '#fff',
//     };
//   }

//   onSwipeUp(gestureState) {
//     this.setState({ myText: 'You swiped up!' });
//   }

//   onSwipeDown(gestureState) {
//     this.setState({ myText: 'You swiped down!' });
//   }

//   onSwipeLeft(gestureState) {
//     this.setState({ myText: 'You swiped left!' });
//   }

//   onSwipeRight(gestureState) {
//     this.setState({ myText: 'You swiped right!' });
//   }

//   onSwipe(gestureName, gestureState) {
//     const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
//     this.setState({ gestureName: gestureName });
//     this.props.onSwipeComplete();
//     console.log(gestureName, gestureState);
//     switch (gestureName) {
//       case SWIPE_UP:
//         this.setState({ backgroundColor: 'red' });
//         break;
//       case SWIPE_DOWN:
//         this.setState({ backgroundColor: 'green' });
//         break;
//       case SWIPE_LEFT:
//         this.setState({ backgroundColor: 'blue' });
//         break;
//       case SWIPE_RIGHT:
//         this.setState({ backgroundColor: 'yellow' });
//         break;
//     }
//   }

//   render() {
//     const config = {
//       velocityThreshold: 0.3,
//       directionalOffsetThreshold: 80,
//     };

//     return (
//       <GestureRecognizer
//         onSwipe={(direction, state) => this.onSwipe(direction, state)}
//         onSwipeUp={state => this.onSwipeUp(state)}
//         onSwipeDown={state => this.onSwipeDown(state)}
//         onSwipeLeft={state => this.onSwipeLeft(state)}
//         onSwipeRight={state => this.onSwipeRight(state)}
//         config={this.props.config || config}
//         style={{
//           flex: 1,
//           backgroundColor: this.state.backgroundColor,
//         }}
//       >
//         <Text>{this.state.myText}</Text>
//         <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
//       </GestureRecognizer>
//     );
//   }
// }

// export default SwipeGesture;
