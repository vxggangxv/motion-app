import React, { useCallback } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export default function OpenUrlButton({
  children,
  style,
  customStyle,
  url,
  width = 30,
  height = 30,
}) {
  const originStyle = !!style?.length && style[0];

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ width, height, ...originStyle, ...customStyle }}
    >
      {children}
      {/* <View style={{ width, height, ...originStyle, ...customStyle }}>{children}</View> */}
    </TouchableOpacity>
  );
}
