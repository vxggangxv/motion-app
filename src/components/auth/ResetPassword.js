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
`;

export default function ResetPassword({ email, onSendEmail = () => {} }) {
  const { register, setValue, watch, errors } = useForm({
    // defaultValues: {
    //   email: email.value,
    // },
  });

  useEffect(() => {
    register('email', {
      required: true,
    });
  }, []);

  return (
    <Container>
      <TitleBox>
        <AppText customStyle={{ textAlign: 'center', marginTop: 15, lineHeight: 22 }}>
          Would you like to send your{'\n'}password to the email you entered?
          {/* 입력하신 이메일로{'\n'}비밀번호를 전송하시겠습니까? */}
        </AppText>
      </TitleBox>
      <Line />
      <ContentBox>
        <InputLabel marginBottom={10}>E-mail</InputLabel>
        <TextInput
          marginBottom={15}
          value={watch('email')}
          placeholder="ex) Bridge@doflab.com"
          returnKeyType="done"
          autoCapitalize="none"
          placeholderTextColor={colors.placeholderDefault}
          error={errors.email}
          onSubmitEditing={onSendEmail}
          onChangeText={text => {
            setValue('email', text);
            email.setValue(text);
          }}
        />
      </ContentBox>
      {/* <AppText></AppText> */}
    </Container>
  );
}
