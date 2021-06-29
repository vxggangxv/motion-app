import React, { useEffect, useRef, useState } from 'react';
import { InputLabel, PickerBox, TextInput } from 'components/common/styled/Form';
import { useForm, Controller } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
import { colors, defaultFont } from 'styles/utils';
import AppCheckbox from 'components/common/AppCheckbox';
import useCheckSetInput from 'hooks/useCheckSetInput';
import AppText from 'components/common/AppText';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSizeRatio } from 'utils/utils';
import { useNavigation } from '@react-navigation/core';
import DismissKeyboard from 'components/common/DismissKeyboard';
import { Picker } from '@react-native-picker/picker';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useModal, modalState } from 'store/modules/app';
import Terms from 'components/base/terms/Terms';
import AppModal from 'components/common/AppModal';
import OriginModal from 'components/common/modal/OriginModal';
import { regEmailExp, regPasswordExp } from 'utils/library';
import { useMemo } from 'react';
import { signUp } from 'api/auth';
import { countriesQuery } from 'store/modules/util';
import { ENV_MODE_DEV } from 'utils/setting';
// import RNPickerSelect from 'react-native-picker-select';

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
  padding: 1% 20px 12%;
  /* background-color: yellow; */
`;
const CraftText = styled.Text`
  font-size: 18px;
  color: white;
`;

const FormBox = styled.View`
  position: relative;
  /* width: 90%; */
  /* height: 465px; */
  /* padding: 35px 20px 45px; */
  padding: 25px 20px 40px;
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

const TermText = styled(AppText)`
  font-size: 13px;
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
  padding: 7% 20px 15%;
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

export default function CreateAccount({ route: { params } }) {
  const navigation = useNavigation();
  const {
    state: countriesStatus,
    contents: { list: countries },
  } = useRecoilValueLoadable(countriesQuery);
  const [isOpenModal, setIsOpenModal] = useState({
    isOpen: false,
    type: 'service',
  });
  // const { addModal, deleteModal, editModal, resetModal } = useModal();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    errors,
    control,
    // formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      // country: 'football',
    },
  });
  const termsAgree = useCheckSetInput(new Set([]));
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const countryRef = useRef();
  // const goToLogin = () => navigation.navigate('LogIn');
  const goToLogin = success => {
    let params = {};
    if (success) {
      params = {
        username: watch('username'),
        password: watch('password'),
      };
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'LogIn', params }],
    });
  };
  const onOpenTermsModal = type => {
    setIsOpenModal({
      isOpen: true,
      type,
    });
  };

  const termsOk = useMemo(() => {
    return termsAgree.value?.has('service') && termsAgree.value?.has('privacy');
  }, [termsAgree.value]);

  // TODO: make sure to use
  const onToggleAllAgree = () => {
    if (termsOk) {
      termsAgree.setValue(new Set([]));
    } else {
      termsAgree.setValue(new Set(['service', 'privacy']));
    }
  };

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  const requireCheck = useMemo(() => {
    return ![
      watch('username'),
      watch('password'),
      watch('confirmPassword'),
      watch('country'),
      termsOk,
    ].some(item => !!item === false);
  }, [watch('username'), watch('password'), watch('confirmPassword'), watch('country'), termsOk]);

  const onValid = async data => {
    // const { username, password, confirmPassword, country } = getValues;

    // valid
    if (!requireCheck) {
      return Alert.alert('Alert', 'Check your inputs');
    }

    // request api
    const submitData = {
      serviceAgree: termsOk ? 1 : 0,
      // ...data,
      email: data?.username,
      password: data?.password,
      passwordConfirm: data?.confirmPassword,
      // countries_id: data?.country,
      countries_id: 116,
    };
    console.log('submitData', submitData);
    // if success
    // TODO: api연결 후 Incorrect password 적용, response messge Alert.alert 띄우기,
    try {
      await signUp(submitData);
      goToLogin(true);
    } catch (error) {
      // console.log('error', error);
    }
  };

  // const sports = [
  //   { label: 'Football', value: 'football', key: 'football' },
  //   { label: 'Baseball', value: 'baseball', key: 'baseball' },
  //   { label: 'Hockey', value: 'hockey', key: 'hockey' },
  // ];

  const onInputData = () => {
    setValue('username', 'test@test.com');
    setValue('password', 'dof0070!');
    setValue('confirmPassword', 'dof0070!');
    setValue('country', 116);
    termsAgree.setValue(new Set(['service', 'privacy']));
  };

  useEffect(() => {
    register('username', {
      required: true,
      pattern: regEmailExp,
    });
    register('password', {
      required: true,
      maxLength: 16,
      pattern: regPasswordExp,
    });
    register('confirmPassword', {
      required: true,
      maxLength: 16,
      // pattern: regPasswordExp,
      validate: value => value === watch('password'),
    });
    register('country', {
      required: true,
    });
  }, []);

  // useEffect(() => {
  //   console.log('username', watch('username'));
  //   console.log('password', watch('password'));
  //   console.log('country', watch('country'));
  // }, [watch]);

  // useEffect(() => {
  //   console.log('errors', errors);
  //   console.log('errors.password', errors.password);
  // }, [errors]);

  // useEffect(() => {
  //   console.log('requireCheck', requireCheck);
  // }, [requireCheck]);

  // useEffect(() => {
  //   console.log('formErrors', formErrors);
  // }, [formErrors]);
  // useEffect(() => {
  //   console.log(`watch('firstName')`, watch('firstName'));
  // }, [watch('firstName')]);

  // append modal
  // useEffect(() => {
  //   // console.log('work check');
  //   // resetModal();
  //   addModal({
  //     visible: false,
  //     renderContent: <Terms type="service" />,
  //     okText: 'Accept',
  //   });
  // }, []);

  // if (countriesStatus !== 'hasValue') return null;
  return (
    <>
      <AppModal
        visible={isOpenModal.isOpen}
        renderContent={<Terms type={isOpenModal.type} />}
        onSwipeGestureDown={() => setIsOpenModal(draft => ({ ...draft, isOpen: false }))}
        onClose={() => setIsOpenModal(draft => ({ ...draft, isOpen: false }))}
        onPress={() => termsAgree.setValue(draft => new Set([...draft, isOpenModal.type]))}
        okText="Accept"
      />
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
          // keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        >
          <Container>
            <FormContainer>
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
                  {errors.username?.type === 'required' && (
                    <InputErrorText>
                      <AppText color={colors.red}>This is required</AppText>
                    </InputErrorText>
                  )}
                  {errors.username?.type === 'pattern' && (
                    <InputErrorText>
                      <AppText color={colors.red}>Please enter a valid email</AppText>
                    </InputErrorText>
                  )}

                  {/* <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextInput onChangeText={value => onChange(value)} value={value} />
                    )}
                    name="firstName"
                    rules={{
                      required: true,
                      validate: () => watch('username') === watch('firstName'),
                    }}
                    defaultValue=""
                  /> */}

                  <InputLabel marginBottom={10}>Password</InputLabel>
                  <TextInput
                    marginBottom={15}
                    value={watch('password')}
                    ref={passwordRef}
                    placeholder="Use 8 to 16 characters (letters, numbers)"
                    returnKeyType="next"
                    secureTextEntry
                    placeholderTextColor={colors.placeholderDefault}
                    error={errors.password}
                    onSubmitEditing={() => onNext(confirmPasswordRef)}
                    onChangeText={text => setValue('password', text)}
                  />
                  {errors.password?.type === 'required' && (
                    <InputErrorText>
                      <AppText color={colors.red}>This is required.</AppText>
                    </InputErrorText>
                  )}
                  {errors.password?.type === 'pattern' && (
                    <InputErrorText>
                      <AppText color={colors.red}>
                        Please 8 to 16 characters (letters, numbers)
                      </AppText>
                    </InputErrorText>
                  )}

                  <InputLabel marginBottom={10}>Confirm Password</InputLabel>
                  <TextInput
                    marginBottom={15}
                    value={watch('confirmPassword')}
                    ref={confirmPasswordRef}
                    returnKeyType="next"
                    secureTextEntry
                    placeholderTextColor={colors.placeholderDefault}
                    error={errors.confirmPassword}
                    onSubmitEditing={() => onNext(countryRef)}
                    onChangeText={text => setValue('confirmPassword', text)}
                  />
                  {errors.confirmPassword?.type === 'required' && (
                    <InputErrorText>
                      <AppText color={colors.red}>This is required</AppText>
                    </InputErrorText>
                  )}
                  {errors.confirmPassword?.type === 'validate' && (
                    <InputErrorText>
                      <AppText color={colors.red}>Does not match password</AppText>
                    </InputErrorText>
                  )}

                  <InputLabel marginBottom={10}>Country</InputLabel>
                  <PickerBox marginBottom={15} error={errors.country}>
                    <Picker
                      selectedValue={watch('country')}
                      style={{
                        height: '100%',
                        width: '100%',
                        color: !watch('country') ? colors.disableDefault : colors.blackFont,
                      }}
                      itemStyle={{
                        fontFamily: defaultFont.regular,
                        fontSize: 13,
                      }}
                      onValueChange={(itemValue, itemIndex) => setValue('country', itemValue)}
                    >
                      <Picker.Item
                        label="Touch this selection"
                        value=""
                        color={colors.disableDefault}
                        // style={{ padding: 0 }}
                      />
                      {!!countries?.length &&
                        countries.map(item => (
                          <Picker.Item
                            label={item.name}
                            value={item.id}
                            key={item.id}
                            color={colors.blackFont}
                          />
                        ))}
                      {/* <Picker.Item label="Up" value="Up" />
                      <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" /> */}
                    </Picker>
                  </PickerBox>
                  {errors.country?.type === 'required' && (
                    <InputErrorText>
                      <AppText color={colors.red}>This is required</AppText>
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
                        name="AllAgree"
                        checked={termsOk}
                        onPress={onToggleAllAgree}
                        labelPlacement="end"
                        label={
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TermText customStyle={{ marginLeft: 10 }}>Accept </TermText>
                            <TouchableOpacity
                              onPress={() => {
                                onOpenTermsModal('service');
                              }}
                            >
                              <TermText
                                customStyle={{
                                  color: colors.blue,
                                  textDecorationLine: 'underline',
                                }}
                              >
                                Terms of Service
                              </TermText>
                            </TouchableOpacity>
                            <TermText> & </TermText>
                            <TouchableOpacity
                              onPress={() => {
                                onOpenTermsModal('privacy');
                              }}
                            >
                              <TermText
                                customStyle={{
                                  color: colors.blue,
                                  textDecorationLine: 'underline',
                                }}
                              >
                                Privacy Policy
                              </TermText>
                            </TouchableOpacity>
                          </View>
                        }
                        labelStyle={{
                          marginLeft: 10,
                          fontSize: 13,
                        }}
                      />
                    </View>
                    {/* <TouchableOpacity onPress={() => null}>
                  <LostPassword>Lost Password?</LostPassword>
                </TouchableOpacity> */}
                  </View>
                </FormBox>
                <ActionBox>
                  <SubmitButton
                    disabled={!requireCheck}
                    // disabled={true}
                    onPress={handleSubmit(onValid)}
                  >
                    <AppText customStyle={{ fontSize: 15, color: '#fff' }}>Sign Up</AppText>
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
                Already have an account?
              </AppText>
              <TouchableOpacity onPress={goToLogin}>
                <OtherLink>Login</OtherLink>
              </TouchableOpacity>
            </OrContainer>
          </Container>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
}

// onValueChange error issue
/* <PickerBox>
  <RNPickerSelect
    // value={watch('country')}
    // selectedValue={country}
    value={Platform.OS === 'ios' ? (!!country ? country : null) : undefined}
    itemKey={Platform.OS === 'android' ? (!!country ? country : null) : undefined}
    placeholder={{
      label: 'Touch this selection',
      value: undefined,
      color: colors.disableDefault,
    }}
    ref={countryRef}
    // useNativeAndroidPickerStyle={false}
    onValueChange={value => setCountry(value)}
    items={sports}
  />
</PickerBox> */
