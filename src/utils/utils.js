import { Dimensions, Platform, PixelRatio } from 'react-native';
import { colors } from 'styles/utils';

export function fontSizeRatio(ratio = 52) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const scale = screenWidth / 1440; // 기준 넓이 1440

  const newSize = ratio * scale;
  // console.log('newSize', newSize);
  let result = 0;
  if (Platform.OS === 'ios') {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }

  // console.log('result', result);
  return result;
}

export function convertMachineStage(stage) {
  let stageColor = colors.stageReady;
  let stageText = 'Off-line';
  if (stage === 1) {
    stageColor = colors.stageReady;
    stageText = 'Ready';
  } else if (stage === 2) {
    stageColor = colors.stageWorking;
    stageText = 'Working';
  } else if (stage === 3) {
    stageColor = colors.stageError;
    stageText = 'Error';
  } else {
    stageColor = colors.stageOff;
    stageText = 'Off-line';
  }

  return { stageColor, stageText };
}
