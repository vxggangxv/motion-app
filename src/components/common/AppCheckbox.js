import React, { Fragment, useEffect, useRef } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import { colors } from 'styles/utils';
import AppText from './AppText';
import PropTypes from 'prop-types';

const IconContainer = styled.View`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  align-items: center;
  justify-content: center;
  background: ${props => (props.checked ? colors.blue : '#b1b1b1')};
  border-radius: 4px;
`;

export default function AppCheckbox({
  checked = false,
  width = 21,
  iconSize = 19,
  color = colors.blue,
  labelPlacement,
  label,
  labelStyle,
  onPress = () => {},
}) {
  const isStringLabel = typeof label === 'string';

  // console.log('checked', checked);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {!!label && labelPlacement === 'start' && (
        <>{isStringLabel ? <AppText customStyle={labelStyle}>{label}</AppText> : <>{label}</>}</>
      )}
      <TouchableWithoutFeedback onPress={onPress}>
        <IconContainer width={width} checked={checked}>
          <Icon
            name="checkmark"
            style={{
              fontSize: iconSize,
              color: 'white',
              borderRadius: 4,
            }}
          />
        </IconContainer>
      </TouchableWithoutFeedback>
      {!!label && labelPlacement === 'end' && (
        <>{isStringLabel ? <AppText customStyle={labelStyle}>{label}</AppText> : <>{label}</>}</>
      )}
    </View>
  );
}

AppCheckbox.propTypes = {
  label: PropTypes.node,
};
