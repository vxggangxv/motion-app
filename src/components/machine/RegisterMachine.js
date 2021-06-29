import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import AppText from 'components/common/AppText';
import { colors, palette } from 'styles/utils';
import { useForm } from 'react-hook-form';
import { InputLabel, TextInput } from 'components/common/styled/Form';

const Container = styled.View`
  position: relative;
  /* background-color: yellow; */
`;
const TitleBox = styled.View`
  align-items: center;
`;
const Line = styled.View`
  height: 1px;
  margin: 15px 30px;
  background-color: ${palette.grayB1};
`;
const ContentBox = styled.View`
  padding: 0 30px;
  margin-top: 15px;
`;

export default function RegisterMachine({ serialNumber, onSendEmail = () => {} }) {
  const { register, setValue, watch, errors } = useForm({
    defaultValues: {
      // serialNumber: serialNumber.value,
    },
  });

  useEffect(() => {
    register('serialNumber', {
      required: true,
    });
  }, []);

  return (
    <Container>
      <ContentBox>
        <InputLabel marginBottom={10}>Serial Number</InputLabel>
        <TextInput
          marginBottom={15}
          value={watch('serialNumber')}
          returnKeyType="done"
          autoCapitalize="none"
          placeholder="Check your product"
          placeholderTextColor={colors.placeholderDefault}
          error={errors.serialNumber}
          onSubmitEditing={onSendEmail}
          onChangeText={text => {
            setValue('serialNumber', text);
            serialNumber.setValue(text);
          }}
        />
      </ContentBox>
      {/* <AppText></AppText> */}
    </Container>
  );
}
