import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { colors } from 'styles/utils';

const Container = styled.View`
  z-index: 100;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.3); */
`;

export default function FullScreenLoading({ visible, type = 'circle' }) {
  if (visible === false) return null;
  return (
    <Container>
      {/* <ActivityIndicator /> */}
      {/* <ActivityIndicator size="large" /> */}
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      {/* <ActivityIndicator size="large" color="#00ff00" /> */}
      <ActivityIndicator size="large" color={colors.blue} />
    </Container>
  );
}

FullScreenLoading.propTypes = {
  visible: PropTypes.bool.isRequired,
  size: PropTypes.number,
};
