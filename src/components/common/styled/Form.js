// import { Picker } from 'react-native';
import styled from 'styled-components/native';
import { colors, defaultFont } from 'styles/utils';

export const InputLabel = styled.Text`
  position: relative;
  font-size: 14px;
  color: ${colors.blackFont};
  font-family: ${defaultFont.regular};
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
`;

export const TextInput = styled.TextInput`
  position: relative;
  background-color: white;
  height: 36px;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid ${props => (props.error ? colors.red : colors.inputBorderDefault)};
  font-family: ${defaultFont.regular};
  font-size: 13px;
  color: ${colors.blackFont};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
  /* margin-bottom: ${props => (props.lastOne ? '15' : 8)}px; */
`;

export const TextInputMultiline = styled.TextInput`
  position: relative;
  background-color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid ${props => (props.error ? colors.red : colors.inputBorderDefault)};
  font-family: ${defaultFont.regular};
  font-size: 13px;
  color: ${colors.blackFont};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
  /* margin-bottom: ${props => (props.lastOne ? '15' : 8)}px; */
`;

export const PickerBox = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
  height: 36px;
  border-radius: 5px;
  border: 1px solid ${props => (props.error ? colors.red : colors.inputBorderDefault)};
  font-family: ${defaultFont.regular};
  font-size: 13px;
  color: ${colors.blackFont};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)}px;
`;
