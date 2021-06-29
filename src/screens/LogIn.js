import React, { useEffect, useRef, useState } from 'react';
import { InputLabel, TextInput } from 'components/common/styled/Form';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/utils';
import AppCheckbox from 'components/common/AppCheckbox';
import useCheckSetInput from 'hooks/useCheckSetInput';
import AppText from 'components/common/AppText';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSizeRatio } from 'utils/utils';
import { CommonActions, useNavigation } from '@react-navigation/core';
import DismissKeyboard from 'components/common/DismissKeyboard';
import { useModal } from 'store/modules/app';
import ResetPassword from 'components/auth/ResetPassword';
import useInput from 'hooks/useInput';
import AppModal from 'components/common/AppModal';
import { WithLocalSvg } from 'react-native-svg';
import { regEmail } from 'utils/library';
import { AUTO_LOGIN, logUserIn } from 'store/apollo';
import { sendResetEmail, signIn } from 'api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  /* width: 100%; */
  justify-content: center;
  align-items: center;
`;

const loginFormHeightRatio = (9 / 11) * 100;
const orHeightRatio = (2 / 11) * 100;

const FormContainer = styled.View`
  position: relative;
  width: 100%;
  align-items: center;
  padding: 8% 20px 21%;
  /* background-color: yellow; */
`;
const CraftText = styled.Text`
  font-size: 18px;
  color: white;
`;

const FormBox = styled.View`
  position: relative;
  /* width: 90%; */
  height: 300px;
  /* padding: 35px 20px 85px; */
  /* padding: 25px 20px 50px; */
  padding: 35px 20px 0px;
  margin-top: 15%;
  background-color: white;
  border-radius: 6px;
`;

const LostPassword = styled(AppText)`
  font-size: 12px;
  color: #bababa;
  text-decoration: underline;
`;

const InputErrorText = styled.Text`
  margin-top: -10px;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 12px;
`;

const ActionBox = styled.View`
  margin-top: -27px;
  height: 54px;
  align-items: flex-end;
`;

const SubmitButton = styled(TouchableOpacity)`
  right: -20px;
  width: 50%;
  height: 100%;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: ${props => (props.disabled ? colors.disableDefault : colors.blue)};
`;

const ForwordArrow = styled(Icon)`
  position: relative;
  margin-left: 15px;
  margin-right: -10px;
  color: #fff;
`;

const OrContainer = styled.View`
  position: relative;
  width: 100%;
  padding: 7% 20px 10%;
  align-items: center;
  justify-content: center;
  /* background-color: green; */
`;

const OrTextBox = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 1px;
  align-items: center;
  background: ${colors.blue};
`;

const OrText = styled(AppText)`
  top: -12px;
  padding: 0 10px;
  background-color: ${colors.navy};
  color: ${colors.blue};
  font-size: 15px;
`;

const OtherLink = styled(AppText)`
  margin-top: 5px;
  text-decoration: underline;
  color: white;
  font-family: 'OpenSansSemiBoldItalic';
`;

export default function LogIn({ route: { params } }) {
  const navigation = useNavigation();
  const { register, handleSubmit, setValue, watch, errors } = useForm({
    // mode: 'onSubmit',
    // reValidateMode: 'onChange',
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  useEffect(() => {
    console.log('params', params);
  }, [params]);

  const autoLogin = useCheckSetInput(new Set(['autoLogin']));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const email = useInput('');
  const passwordRef = useRef();
  // const { addModal, resetModal } = useModal();
  // const goToCreateAccount = () => navigation.navigate('CreateAccount');
  const goToCreateAccount = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: 'CreateAccount' }],
    });

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  const onValid = async data => {
    const autoLoginValue = autoLogin.value?.has('autoLogin') ? 'true' : 'false';
    await AsyncStorage.setItem(AUTO_LOGIN, autoLoginValue);
    // request api
    const submitData = {
      // autoLogin: autoLogin.value?.has('autoLogin') ? 1 : 0,
      // ...data,
      email: data?.username,
      password: data?.password,
    };
    console.log('submitData', submitData);
    // if success
    // TODO: api연결 후 Incorrect password 적용, response messge Alert.alert 띄우기
    try {
      const response = await signIn(submitData);
      const token = response.headers['x-access-token'];
      // Alert.alert('submit', 'submit');
      // navigation.navigate('MachineList');
      // navigation.navigate('Main');
      // userInfo 저장
      const userInfoData = response.data?.userInfo;
      const userInfo = {
        email: userInfoData.email,
        country: userInfoData.country,
        countries_id: userInfoData.countries_id,
      };
      // console.log('token', token);
      // console.log('userInfo', userInfo);
      logUserIn(token, userInfo);
    } catch (error) {
      // console.log('error', error);
    }
  };

  const onSendResetEmail = () => {
    if (!email.value) return;
    // request api
    console.log('emailData', email.value);
    sendResetEmail({ email: email.value });
  };

  const onInputData = () => {
    setValue('username', 'jun@doflab.com');
    setValue('password', 'dof0070!');
  };

  useEffect(() => {
    register('username', {
      required: true,
    });
    register('password', {
      required: true,
      maxLength: 16,
    });
  }, []);

  // append modal
  // useEffect(() => {
  //   resetModal();
  //   addModal({
  //     key: 'auth/test',
  //     visible: false,
  //     renderContent: <Text>'auth/test'</Text>,
  //     okText: 'Accept',
  //   });

  // }, []);

  // useEffect(() => {
  //   // console.log(watch);
  //   console.log('username', watch('username'));
  //   console.log('password', watch('password'));
  // }, [watch]);

  // useEffect(() => {
  //   console.log('email.value', email.value);
  // }, [email.value]);

  return (
    <>
      <AppModal
        visible={isOpenModal}
        renderContent={<ResetPassword email={email} />}
        onClose={() => setIsOpenModal(false)}
        onPress={onSendResetEmail}
        header={
          <AppText fontWeight={700} customStyle={{ marginTop: 20 }}>
            Reset password
          </AppText>
        }
        okText={
          <>
            <WithLocalSvg asset={require('assets/images/icons/icon_paper_plane.svg')} />
            <AppText
              color="white"
              fontSize={21}
              fontStyle="italic"
              fontWeight={500}
              customStyle={{ letterSpacing: 1, marginLeft: 10 }}
            >
              Send
            </AppText>
          </>
        }
        disabledOk={!regEmail(email.value)}
      />
      <DismissKeyboard>
        <Container>
          <FormContainer>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <CraftText>Put the </CraftText>
                <Image
                  source={require('assets/images/contents/craft5x_with_bg.png')}
                  style={{
                    width: 101,
                    height: 20,
                    top: 2,
                    marginLeft: 3,
                  }}
                />
              </View>
              <View>
                <CraftText>in your phone</CraftText>
              </View>
            </View>
            <View>
              <FormBox>
                {__DEV__ && <Button title="Input test" onPress={onInputData} />}

                <InputLabel marginBottom={10}>E-mail</InputLabel>
                <TextInput
                  marginBottom={15}
                  value={watch('username')}
                  placeholder="ex) Bridge@doflab.com"
                  returnKeyType="next"
                  autoCapitalize="none"
                  placeholderTextColor={colors.placeholderDefault}
                  error={errors.username}
                  onSubmitEditing={() => onNext(passwordRef)}
                  onChangeText={text => setValue('username', text)}
                />
                {errors.username && (
                  <InputErrorText>
                    <AppText color={colors.red}>This is required.</AppText>
                  </InputErrorText>
                )}
                <InputLabel marginBottom={10}>Password</InputLabel>
                <TextInput
                  marginBottom={15}
                  value={watch('password')}
                  ref={passwordRef}
                  placeholder="Use 8 to 16 characters (letters, numbers)"
                  returnKeyType="done"
                  secureTextEntry
                  placeholderTextColor={colors.placeholderDefault}
                  error={errors.password}
                  onSubmitEditing={handleSubmit(onValid)}
                  onChangeText={text => setValue('password', text)}
                />
                {errors.password && (
                  <InputErrorText>
                    <AppText color={colors.red}>This is required.</AppText>
                  </InputErrorText>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AppCheckbox
                      name="autoLogin"
                      checked={autoLogin.value?.has('autoLogin')}
                      onPress={() => autoLogin.onChange({ value: 'autoLogin' })}
                      labelPlacement="end"
                      label="Remember me"
                      labelStyle={{
                        marginLeft: 10,
                        fontSize: 13,
                      }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setIsOpenModal(true)}>
                    <LostPassword>Lost Password?</LostPassword>
                  </TouchableOpacity>
                </View>
              </FormBox>
              <ActionBox>
                <SubmitButton
                  disabled={!watch('username') || !watch('password')}
                  // disabled={true}
                  onPress={() => {
                    console.log('press');
                    handleSubmit(onValid)();
                  }}
                >
                  <AppText customStyle={{ fontSize: 15, color: '#fff' }}>Login</AppText>
                  <ForwordArrow
                    name="arrow-forward"
                    style={{
                      fontSize: 19,
                    }}
                  />
                </SubmitButton>
              </ActionBox>
            </View>
          </FormContainer>

          <OrContainer>
            <OrTextBox>
              <OrText>or</OrText>
            </OrTextBox>

            <AppText customStyle={{ fontSize: 12, color: 'white' }}>
              You don't have a account?
            </AppText>
            <TouchableOpacity onPress={goToCreateAccount}>
              <OtherLink>CREATE NEW ACCOUNT</OtherLink>
            </TouchableOpacity>
          </OrContainer>
        </Container>
      </DismissKeyboard>
    </>
  );
}
