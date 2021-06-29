import React, { useEffect, useRef, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Actions = styled.View`
  flex: 0.35;
  /* padding: 0px 40px; */
  align-items: center;
  justify-content: center;
  /* justify-content: space-around; */
`;

const ActionsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  height: 10px;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  /* justify-content: space-between; */
  /* justify-content: space-around; */
  /* justify-content: center; */
`;

const TakePhotoBtnBox = styled.View`
  border: 1px white;
  padding: 2px;
  border-radius: 100px;
`;
const TakePhotoBtn = styled.TouchableOpacity`
  margin: 0 auto;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 3px solid rgba(255, 255, 255, 1);
  border-radius: 50px;
`;
const CommonCameraBtn = styled.View`
  width: 50px;
`;
const FrachPhotoBtn = styled.TouchableOpacity`
  /* width: 50px; */
`;
const SwitchCameraBtn = styled.TouchableOpacity`
  /* width: 50px; */
  /* height: 50%; */
`;

const ConfirmActions = styled(Actions)`
  flex-direction: row;
  /* justify-content: space-evenly; */
  justify-content: space-between;
  padding: 0 50px;
`;

const ConfirmAction = styled.TouchableOpacity`
  padding: 25px;
  /* background-color: white; */
  /* padding: 10px 0; */
  /* border-radius: 4px; */
`;
const ConfirmActionText = styled.Text`
  font-size: 20px;
  color: white;
  /* font-weight: 600; */
`;

export default function TakePhoto({ navigation }) {
  const cameraRef = useRef();
  const [takenPhoto, setTakenPhoto] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    console.log('granted', granted);
    setHasPermission(granted);
  };

  const onSwitchCamera = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onChangeZoom = e => {
    setZoom(e);
  };

  const onChangeFlash = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const goToSupport = async save => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'Support',
    //       params: { photo: takenPhoto },
    //     },
    //   ],
    // });
    navigation.navigate('Support', {
      photo: takenPhoto,
    });
  };

  const onCameraReady = () => setCameraReady(true);
  const onTakePhoto = async () => {
    if (cameraRef.current && cameraReady) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
        skipProcessing: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onDismiss = () => setTakenPhoto('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getPermissions();
  }, []);

  // useEffect(() => {
  //   console.log('cameraReady', cameraReady);
  // }, [cameraReady]);

  // TODO: 승인하지 않았을 경우 처리
  // if (!hasPermission) return null;
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === '' ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          // zoom={zoom}
          flashMode={flashMode}
          ref={cameraRef}
          onCameraReady={onCameraReady}
        >
          <CloseBtn onPress={() => goToSupport(false)}>
            <Icon name="close" color="white" size={30} />
          </CloseBtn>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1, flexDirection: 'row' }} />
      )}
      {takenPhoto === '' ? (
        <Actions>
          <ButtonsContainer>
            {/* <FrachPhotoBtn onPress={onChangeFlash}>
              <Icon
                size={30}
                color="white"
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? 'flash-off'
                    : flashMode === Camera.Constants.FlashMode.on
                    ? 'flash'
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? 'eye'
                    : ''
                }
              />
            </FrachPhotoBtn> */}
            <TakePhotoBtnBox>
              <TakePhotoBtn onPress={onTakePhoto} />
            </TakePhotoBtnBox>
            {/* <SwitchCameraBtn onPress={onSwitchCamera}>
              <Icon size={30} color="white" name={'camera-reverse-outline'} />
            </SwitchCameraBtn> */}
          </ButtonsContainer>
          {/* <SliderContainer>
            <Slider
              style={{ width: 200, height: 20 }}
              value={zoom}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <ActionsContainer>
              <TouchableOpacity onPress={onChangeFlash} style={{ marginRight: 30 }}>
                <Icon
                  size={30}
                  color="white"
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? 'flash-off'
                      : flashMode === Camera.Constants.FlashMode.on
                      ? 'flash'
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? 'eye'
                      : ''
                  }
                />
              </TouchableOpacity>
              <SwitchCameraBtn onPress={onSwitchCamera}>
                <Icon
                  size={50}
                  color="white"
                  // name={cameraType === Camera.Constants.Type.front ? 'camera-reverse' : 'camera'}
                  name={'camera-reverse'}
                  // style={{ fontSize: 30 }}
                />
              </SwitchCameraBtn>
            </ActionsContainer>
          </ButtonsContainer> */}
        </Actions>
      ) : (
        <ConfirmActions>
          <ConfirmAction onPress={onDismiss}>
            <ConfirmActionText>Cancel</ConfirmActionText>
          </ConfirmAction>
          <ConfirmAction onPress={goToSupport}>
            <ConfirmActionText>Ok</ConfirmActionText>
          </ConfirmAction>
        </ConfirmActions>
      )}
    </Container>
  );
}
