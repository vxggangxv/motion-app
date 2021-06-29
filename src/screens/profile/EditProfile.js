import React, { useEffect, useRef } from 'react';
import { InputLabel, PickerBox, TextInput } from 'components/common/styled/Form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, defaultFont } from 'styles/utils';
import AppText from 'components/common/AppText';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import DismissKeyboard from 'components/common/DismissKeyboard';
import { Picker } from '@react-native-picker/picker';
import { useRecoilValueLoadable } from 'recoil';
import { regPasswordExp } from 'utils/library';
import { useMemo } from 'react';
import { editProfile } from 'api/user';
import { countriesQuery } from 'store/modules/util';
import { userQuery, useUser } from 'store/modules/user';
// import RNPickerSelect from 'react-native-picker-select';

const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
`;

const loginFormHeightRatio = (9 / 11) * 100;
const orHeightRatio = (2 / 11) * 100;

const FormContainer = styled.View`
  position: relative;
  width: 100%;
  align-items: center;
  padding: 1% 20px 12%;
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
  padding: 35px 20px 65px;
  margin-top: 5%;
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

export default function EditProfile({ route: { params } }) {
  const navigation = useNavigation();
  const {
    state: userStatus,
    contents: { userInfo: user },
  } = useRecoilValueLoadable(userQuery);
  const {
    state: countriesStatus,
    contents: { list: countries },
  } = useRecoilValueLoadable(countriesQuery);
  // const user = useReactiveVar(userVar);
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
      country: user?.countries_id,
    },
  });
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const countryRef = useRef();

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  const requireCheck = useMemo(() => {
    return ![watch('username'), watch('password'), watch('confirmPassword'), watch('country')].some(
      item => !!item === false,
    );
  }, [watch('username'), watch('password'), watch('confirmPassword'), watch('country')]);

  const { prefetchUser } = useUser();
  const onValid = async data => {
    const { email, password, confirmPassword, country } = data;

    // valid
    // if (!requireCheck) {
    //   return Alert.alert('Alert', 'Check your inputs');
    // }

    // format
    // let submitData = {
    //   email: null,
    //   password: null,
    //   countries_id: null,
    // };
    // request api
    const submitData = {
      // email: email ? email : null,
      password: password ? password : null,
      passwordConfirm: confirmPassword ? confirmPassword : null,
      countries_id: country ? country : null,
    };
    console.log('submitData', submitData);
    // if success
    // TODO: api연결 후 Incorrect password 적용, response messge Alert.alert 띄우기
    try {
      await editProfile(submitData);
      // navigation.navigate('MachineList');
      navigation.reset({
        index: 0,
        routes: [{ name: 'MachineList' }],
      });
    } catch (error) {}
    // Alert.alert('submit', 'submit');
  };

  // const sports = [
  //   { label: 'Football', value: 'football', key: 'football' },
  //   { label: 'Baseball', value: 'baseball', key: 'baseball' },
  //   { label: 'Hockey', value: 'hockey', key: 'hockey' },
  // ];

  useEffect(() => {
    register('password', {
      // required: true,
      maxLength: 16,
      pattern: regPasswordExp,
    });
    register('confirmPassword', {
      // required: true,
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
  //   console.log('user', user);
  // }, [user]);

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

  if (countriesStatus !== 'hasValue' || userStatus !== 'hasValue') return null;
  return (
    <>
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
                  <InputLabel marginBottom={10}>E-mail</InputLabel>
                  <TextInput marginBottom={15} value={user.email} editable={false} />
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
                </FormBox>
                <ActionBox>
                  <SubmitButton
                    // disabled={!requireCheck}
                    // disabled={true}
                    onPress={handleSubmit(onValid)}
                  >
                    <AppText customStyle={{ fontSize: 15, color: '#fff' }}>Modify</AppText>
                    <ForwordArrow
                      name="arrow-forward"
                      style={{
                        fontSize: 20,
                      }}
                    />
                  </SubmitButton>
                </ActionBox>
              </View>
            </FormContainer>
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
