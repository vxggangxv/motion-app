import AppText from 'components/common/AppText';
import DismissKeyboard from 'components/common/DismissKeyboard';
// import { TextInput } from 'components/common/styled/Form';
import StageBadge from 'components/machine/StageBadge';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { colors, palette } from 'styles/utils';
import { convertMachineStage } from 'utils/utils';
import { WithLocalSvg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAlert } from 'store/modules/app';
import { screenWidth } from 'utils/constants';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { photosState } from 'store/modules/support';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { userQuery } from 'store/modules/user';
import moment from 'moment';
import * as MailComposer from 'expo-mail-composer';
import { sendSupportEmail } from 'api/user';

const Container = styled.View`
  position: relative;
  flex: 1;
  margin-top: 10px;
  /* justify-content: space-between; */
`;

const KeyboardAvoidingContainer = styled.View`
  position: relative;
  justify-content: flex-end;
  /* background-color: lightgreen; */
`;

const MachineBox = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
`;
const MachineInfo = styled.View``;

const FormBox = styled.View`
  margin-top: 20px;
`;
const FormRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  min-height: 38px;
  border: 0 rgba(255, 255, 255, 0.5);
  border-bottom-width: ${props => (props.isLast ? 0 : 1)}px;
`;
const FormLabel = styled(AppText)`
  font-size: 12px;
  color: white;
`;
const FormText = styled(AppText)`
  font-size: 12px;
  color: ${props => (props.isTo ? colors.placeholderDefault : 'white')};
  margin-left: 5px;
`;
const TextInputBox = styled.View`
  /* flex-direction: row; */
  /* justify-content: flex-start; */
  background-color: white;
  border: 1px red;
`;

const AttachmentsDivision = styled.View`
  margin: 0 20px 0px;
  /* margin-bottom: 10px; */
  border: 0 rgba(255, 255, 255, 0.5);
  border-top-width: 1px;
`;
const AttachmentsBox = styled.View`
  z-index: -1;
  margin: 0 20px;
`;
const PhotoList = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const PhotoItem = styled.View`
  position: relative;
  width: ${(screenWidth - 40 - 40) / 5}px;
  height: ${(screenWidth - 40 - 40) / 5}px;
  margin-left: ${props => (!props.idx ? 0 : 10)}px;
  background-color: ${colors.darkNavy};
  border-radius: 5px;
`;
const DeletePhotoBtn = styled(TouchableOpacity)`
  position: absolute;
  bottom: 1px;
  right: 1px;
`;

const SendActionBox = styled.View`
  z-index: -1;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* margin-top: 20px; */
  padding: 20px 0px 0 30px;
`;
const SendBtn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 57px;
  background-color: ${props => (props.disabled ? colors.disableDefault : colors.blue)};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Dim = styled(Pressable)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PlusActionBox = styled.View`
  align-items: flex-end;
  /* position: absolute; */
  /* top: 436px; */
  /* right: 0; */
  margin-top: -20px;
`;
const PlusCommonAction = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  right: 20px;
  /* height: 40px; */
`;
const PlusAction = styled(PlusCommonAction)``;
const PhotoAction = styled(PlusCommonAction)`
  position: absolute;
  top: -50px;
`;
const CameraAction = styled(PlusCommonAction)`
  position: absolute;
  top: -100px;
`;
const IconBox = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  width: 40px;
  height: 40px;
  background-color: ${props => (props.isPlus || props.disabled ? palette.grayB1 : colors.blue)};
  border-radius: 20px;
`;

export default function Support({ route, navigation }) {
  const serialNumber = route?.params?.serialNumber || '21010056AAA';
  // const serialNumber = route?.params?.serialNumber;
  const deviceMode = route?.params?.deviceMode || 'working';
  const photoParam = route?.params?.photo;
  const photosParam = route?.params?.photos;

  const {
    state: userStatus,
    contents: { userInfo: user },
  } = useRecoilValueLoadable(userQuery);
  // const photos = route?.params?.photos || [];
  const [photos, setPhotos] = useRecoilState(photosState);
  // const [photos, setPhotos] = useState([]);
  const { addAlert } = useAlert();
  const { stageColor, stageText } = convertMachineStage(deviceMode);
  // 임시
  const receiver = 'support@doflab.com';
  const sender = 'Edwin@doflab.com';
  // const recipients = 'Edwin@doflab.com, support@doflab.com'?.replace(' ', '')?.split(',');
  // const recipients = ''?.replace(' ', '')?.split(',');
  // console.log('recipients', recipients);
  //
  const subject = `[MotionApp Support] ${moment().format('YYYY.MM.DD')}`;
  const maxPhotosCount = 5;
  const isGteMaxPhotosCount = photos.length >= 5;
  // const photos = [1, 2, 3, 4, 5];
  const { register, handleSubmit, getValues, setValue, watch, errors, control } = useForm({
    defaultValues: {
      subject,
    },
  });
  const [isShowPlusAction, setIsShowPlusAction] = useState(false);
  const contentRef = useRef();

  const goToMachineList = () => {
    navigation.navigate('MachineList');
  };
  const goToTakePhoto = () => {
    setIsShowPlusAction(false);
    navigation.navigate('TakePhoto');
  };
  const goToSelectPhoto = () => {
    setIsShowPlusAction(false);
    navigation.navigate('SelectPhoto', {
      photosCount: photos.length,
    });
  };

  const deletePhoto = id => {
    setPhotos(draft => draft.filter((item, index) => id !== index));
  };

  const onNext = nextOne => {
    nextOne?.current?.focus();
  };

  // const requireCheck = useMemo(() => {
  //   return ![watch('subject'), watch('content')].some(item => !!item === false);
  // }, [watch('subject'), watch('content')]);

  // 현재 사용 X
  // 기기의 email 앱 사용시, 이메일 계정연동 필요
  const sendEmail = async () => {
    const enabled = await MailComposer.isAvailableAsync();
    if (enabled) {
      try {
        const { status } = await MailComposer.composeAsync({
          subject: watch('subject'),
          body: watch('content'),
          recipients: user?.distributorEmail?.replace(' ', '')?.split(','),
          // recipients: ['toxnsldxn@gmail.com'],
          // recipients: 'toxnsldxn@gmail.com',
          attachments: photos,
        });
        console.log('status', status);
        goToMachineList();
      } catch (error) {
        Alert.alert('', 'Error');
      }
    } else {
      Alert.alert('Failed', 'Setup to unblock outgoing mail');
    }
  };

  const onValid = async data => {
    let submitData = {
      // sender,
      fromEmail: user?.email,
      title: data?.subject,
      body: data?.content,
    };
    console.log('loginDatasubmitData', submitData);

    const formData = new FormData();
    formData.append('fromEmail', submitData.fromEmail);
    formData.append('title', submitData.title);
    formData.append('body', submitData.body);
    if (!!photos?.length) {
      const photoData = photos.reduce((acc, curr) => {
        const obj = {
          uri: curr,
          type: 'multipart/form-data',
          name: curr.slice(curr.lastIndexOf('/') + 1),
        };

        return acc.concat(obj);
      }, []);
      // console.log(photoData);
      photoData.forEach(item => {
        formData.append('attachment', item);
      });
    }

    // request api
    // sendEmail();
    addAlert({
      visible: true,
      renderContent: 'Completed',
      okText: 'OK',
      onPress: async () => {
        // request api
        try {
          await sendSupportEmail(formData);
          goToMachineList();
        } catch (error) {}
      },
    });
  };

  const [launchCameraResponse, setLaunchCameraResponse] = useState(null);
  const [launchImageLibraryResponse, setLaunchImageLibraryResponse] = useState(null);
  const onLaunchCamera = () => {
    launchCamera(
      {
        cameraType: 'back',
        quality: 1,
        saveToPhotos: true,
      },
      setLaunchCameraResponse,
    );
  };
  const onLaunchImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 5,
      },
      setLaunchImageLibraryResponse,
    );
  };
  // useEffect(() => {
  //   console.log('launchCameraResponse?.assets', launchCameraResponse?.assets);
  // }, [launchCameraResponse]);
  // useEffect(() => {
  //   console.log('launchImageLibraryResponse?.assets', launchImageLibraryResponse?.assets);
  // }, [launchImageLibraryResponse]);

  useEffect(() => {
    register('subject', {
      required: true,
    });
    register('content', {
      required: true,
    });
  }, []);

  useEffect(() => {
    if (photosParam?.length) {
      setPhotos(draft => {
        if (draft.length < 5) {
          return [...draft, ...photosParam];
        } else {
          return draft;
        }
      });
      // setPhotos(photosParam);
    }
    console.log('photosParam', photosParam);
  }, [photosParam]);

  useEffect(() => {
    if (photoParam) {
      setPhotos(draft => [...draft, photoParam]);
    }
    console.log('photoParam', photoParam);
  }, [photoParam]);

  // function getImageSize(url) {
  //   return new Promise((resolve, reject) => {
  //     let image = new Image();
  //     image.onload = () => {
  //       resolve({
  //         width: image.naturalWidth,
  //         height: image.naturalHeight,
  //       });
  //     };
  //     image.src = url;
  //   });
  // }

  // useEffect(() => {
  //   if (!!photos?.length) {
  //     photos.forEach(item => {
  //       getImageSize(item);
  //     });
  //   }
  // }, [photos]);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  // useEffect(() => {
  //   console.log('photos.length', photos.length);
  // }, [photos]);

  // TODO: 받는 사람, 보내는 사람 자동 생성, 수정 불가,
  // 받는 사람 주소는 해당 나라의 딜러 이메일, 한국은 support@doflab.com, 외국의 경우 한국 참조

  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          behavior="height"
          // keyboardVerticalOffset={95}
        >
          <KeyboardAvoidingContainer>
            <MachineBox>
              <Image source={require('assets/images/contents/miling_machine_support.png')} />
              <MachineInfo>
                <StageBadge color={stageColor} text={stageText} />
                <AppText fontSize={15} customStyle={{ marginTop: 5 }}>
                  {serialNumber}
                </AppText>
              </MachineInfo>
            </MachineBox>

            <FormBox>
              <FormRow>
                <FormLabel>To : </FormLabel>
                <FormText isTo>{user?.distributorEmail}</FormText>
              </FormRow>
              <FormRow>
                <FormLabel>From : </FormLabel>
                <FormText>{user?.email}</FormText>
              </FormRow>
              <FormRow>
                <FormLabel>Subject : </FormLabel>
                <TextInput
                  placeholder="Enter..."
                  value={watch('subject')}
                  placeholderTextColor={colors.placeholderDefault}
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => onNext(contentRef)}
                  onChangeText={text => setValue('subject', text)}
                  style={{
                    fontSize: 12,
                    color: 'white',
                    padding: 0,
                  }}
                />
              </FormRow>
              <FormRow isLast>
                <TextInput
                  multiline
                  numberOfLines={20}
                  ref={contentRef}
                  // editable
                  value={watch('content')}
                  placeholder="Enter..."
                  placeholderTextColor={colors.placeholderDefault}
                  returnKeyType="done"
                  autoCapitalize="none"
                  onSubmitEditing={handleSubmit(onValid)}
                  onChangeText={text => setValue('content', text)}
                  style={{
                    textAlignVertical: 'top',
                    color: 'white',
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                    maxHeight: 200,
                  }}
                />
              </FormRow>
            </FormBox>

            <AttachmentsDivision />
            <PlusActionBox>
              {isShowPlusAction && (
                <>
                  <CameraAction onPress={goToTakePhoto} disabled={isGteMaxPhotosCount}>
                    <AppText fontSize={12} color="white">
                      Camera
                    </AppText>
                    <IconBox disabled={isGteMaxPhotosCount}>
                      <WithLocalSvg asset={require('assets/images/icons/icon_camera.svg')} />
                    </IconBox>
                  </CameraAction>
                  <PhotoAction onPress={goToSelectPhoto} disabled={isGteMaxPhotosCount}>
                    <AppText fontSize={12} color="white">
                      Photo
                    </AppText>
                    <IconBox disabled={isGteMaxPhotosCount}>
                      <WithLocalSvg asset={require('assets/images/icons/icon_photo.svg')} />
                    </IconBox>
                  </PhotoAction>
                </>
              )}
              <PlusAction onPress={() => setIsShowPlusAction(draft => !draft)}>
                <IconBox isPlus>
                  <Icon
                    name="add-outline"
                    style={{
                      fontSize: 30,
                      color: 'white',
                    }}
                  />
                </IconBox>
              </PlusAction>
            </PlusActionBox>

            <AttachmentsBox>
              {!!photos?.length && (
                <>
                  <View style={{ paddingVertical: 5 }}>
                    <FeatherIcon name="paperclip" style={{ fontSize: 16, color: 'white' }} />
                  </View>
                  <PhotoList>
                    {Array.from({ length: maxPhotosCount }).map((item, idx) => (
                      <PhotoItem key={idx} idx={idx}>
                        {photos[idx] && (
                          <>
                            <Image
                              source={{ uri: photos[idx] }}
                              style={{ width: '100%', height: '100%', borderRadius: 5 }}
                              resizeMode="cover"
                            />
                            <DeletePhotoBtn onPress={() => deletePhoto(idx)}>
                              <Icon
                                name="trash"
                                // name="trash-outline"
                                // name="close-circle-outline"
                                // name="close-circle"
                                // name="close-outline"
                                style={{ fontSize: 17, color: 'rgba(255,255,255, .8)' }}
                              />
                            </DeletePhotoBtn>
                          </>
                        )}
                      </PhotoItem>
                    ))}
                  </PhotoList>
                </>
              )}
            </AttachmentsBox>

            {/* <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={onLaunchCamera}
                style={{ borderWidth: 1, borderColor: 'white' }}
              >
                <AppText color="white" customStyle={{ textAlign: 'center', paddingVertical: 15 }}>
                  Open camera app
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onLaunchImageLibrary}
                style={{ borderWidth: 1, borderColor: 'white' }}
              >
                <AppText color="white" customStyle={{ textAlign: 'center', paddingVertical: 15 }}>
                  Open image library app
                </AppText>
              </TouchableOpacity>
            </View> */}
            <SendActionBox>
              <TouchableOpacity onPress={goToMachineList}>
                <Icon name="close-outline" style={{ fontSize: 32, color: palette.grayB1 }} />
              </TouchableOpacity>
              <SendBtn
                disabled={!watch('subject') || !watch('content')}
                onPress={handleSubmit(onValid)}
              >
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
              </SendBtn>
            </SendActionBox>
          </KeyboardAvoidingContainer>
        </KeyboardAvoidingView>

        {/* {isShowPlusAction && <Dim onPress={() => setIsShowPlusAction(false)} />} */}
      </Container>
    </DismissKeyboard>
  );
}
