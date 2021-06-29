import React, { useEffect, useRef, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default function TakePhoto({ navigation }) {
  const cameraRef = useRef();
  const [takenPhoto, setTakenPhoto] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [launchCameraResponse, setLaunchCameraResponse] = useState(null);

  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    console.log('granted', granted);
    // status: 'granted' | 'undetermined' | 'denied';
    // granted: boolean;
    setHasPermission(granted);
  };

  const goToSupport = photo => {
    navigation.navigate('Support', { photo });
  };

  const onLaunchCamera = () => {
    launchCamera(
      {
        cameraType: 'back',
        quality: 1,
        saveToPhotos: true,
      },
      setLaunchCameraResponse,
    );
  };

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    // console.log('hasPermission', hasPermission);
    if (hasPermission === false) {
      return goToSupport();
    }
    if (hasPermission) {
      onLaunchCamera();
    }
  }, [hasPermission]);

  useEffect(() => {
    // console.log('launchCameraResponse', launchCameraResponse);
    if (launchCameraResponse?.didCancel) return goToSupport();
    if (launchCameraResponse?.assets) {
      const { uri } = launchCameraResponse?.assets[0];
      return goToSupport(uri);
    }
  }, [launchCameraResponse]);

  // useEffect(() => {
  //   console.log('cameraReady', cameraReady);
  // }, [cameraReady]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* <Text style={{ color: 'white' }}>Camera on</Text> */}
    </View>
  );
}
