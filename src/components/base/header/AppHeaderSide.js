import AppText from 'components/common/AppText';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';

export default function AppHeaderSide(props) {
  const navigation = useNavigation();
  let { side = 'left', icon, label = '', onPress = () => navigation.goBack() } = props;
  // let { side = 'left', icon, label = '', onPress } = props;
  // console.log('props', props);

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignContent: 'center', paddingHorizontal: 10 }}
      onPress={onPress}
    >
      {side === 'left' && (
        <>{icon ? <>{icon}</> : <Icon color={props.tintColor} name="chevron-back" size={20} />}</>
      )}
      <AppText fontSize={16} fontWeight={500} color="white" customStyle={{ paddingLeft: 0 }}>
        {label ? label : props.label}
      </AppText>
      {side === 'right' && (
        <>{icon ? <>{icon}</> : <Icon color={props.tintColor} name="chevron-back" size={20} />}</>
      )}
    </TouchableOpacity>
  );
}

AppHeaderSide.propTypes = {
  icon: PropTypes.element,
};
