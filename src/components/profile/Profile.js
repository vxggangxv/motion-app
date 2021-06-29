import React, { Fragment, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { colors, palette } from 'styles/utils';
import { screenWidth } from 'utils/constants';
import { WithLocalSvg } from 'react-native-svg';
import AppText from 'components/common/AppText';
import OpenUrlButton from 'components/common/button/OpenUrlButton';
import { useNavigation } from '@react-navigation/core';
import { logOutRequest } from 'store/apollo';
import { useRecoilStateLoadable } from 'recoil';
import { userQuery } from 'store/modules/user';
import { useRnFocusEffect } from 'utils/hooks';
// import ScreenLayout from 'components/common/ScreenLayout';

const Container = styled.View`
  width: ${screenWidth - 50}px;
  margin-left: auto;
  background-color: white;
  border-top-left-radius: 10px;
`;

const ContentBox = styled.View`
  padding: 20px 30px;
`;
const ActionBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const InfoBox = styled.View`
  /* margin-bottom: 15px; */
`;
const InfoText = styled(AppText)`
  /* border: 1px solid transparent;
  border-bottom-color: ${colors.blue}; */
  margin: 15px 0;
  padding-bottom: 15px;
  border: 0px solid ${colors.blue};
  border-bottom-width: 1px;
`;
const LogOutBtn = styled(TouchableOpacity)`
  align-items: flex-end;
`;

const BottomBox = styled.View`
  padding: 20px 30px;
  background-color: #d3d8de;
`;

const LinkBox = styled.View`
  flex-direction: row;
`;
const SnsLinkBtn = styled(OpenUrlButton)`
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-top: 10px;
  margin-right: 20px;
  border-radius: 20px;
  border: 1px solid #97999c;
`;

export default function Profile({ onClose = () => {} }) {
  const navigation = useNavigation();
  // const userStatus = 'loading';
  // const {
  //   state: userStatus,
  //   contents: { userInfo: user },
  // } = useRecoilValueLoadable(userQuery);
  const [
    {
      state: userStatus,
      contents: { userInfo: user },
    },
    setUser,
  ] = useRecoilStateLoadable(userQuery);

  const goToEditProfile = () => {
    navigation.navigate('EditProfile');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'EditProfile' }],
    // });
    onClose();
  };

  const userInfo = useMemo(() => {
    if (userStatus === 'hasValue') {
      return {
        email: user.email,
        // password: user.password?.charAt(0),
        country: user.country,
        distributor: user.distributorName,
        distributorEmail: user.distributorEmail,
      };
    }
  }, [userStatus === 'hasValue']);

  const userInfoLabelList = [
    {
      index: 'email',
      label: 'E-mail',
    },
    // { index: 'password' },
    { index: 'country' },
    { index: 'distributor' },
    { index: 'distributorEmail', label: 'Distributor E-mail' },
  ];

  const snsList = [
    {
      url: 'https://www.facebook.com/doflab',
      iconName: 'facebook',
    },
    {
      url: 'https://www.instagram.com/dof_inc/',
      iconName: 'instagram',
    },
    {
      url: 'https://www.linkedin.com/company/dof-inc./',
      iconName: 'linkedin',
    },
    {
      url: 'https://www.youtube.com/c/DOFinc',
      iconName: 'youtube-play',
    },
  ];

  // <SnsLinkBtn url="https://www.facebook.com/doflab">
  //   <FontAwesomeIcon name="facebook" style={{ color: '#97999C', fontSize: 22 }} />
  // </SnsLinkBtn>
  // <SnsLinkBtn url="https://www.youtube.com/c/DOFinc">
  //   <FontAwesomeIcon name="instagram" style={{ color: '#97999C', fontSize: 22 }} />
  // </SnsLinkBtn>
  // <SnsLinkBtn url="https://www.instagram.com/dof_inc/">
  //   <FontAwesomeIcon name="youtube-play" style={{ color: '#97999C', fontSize: 22 }} />
  // </SnsLinkBtn>
  // <SnsLinkBtn url="https://www.linkedin.com/company/dof-inc./">
  //   <FontAwesomeIcon name="linkedin" style={{ color: '#97999C', fontSize: 22 }} />
  // </SnsLinkBtn>

  const onSignOut = async () => {
    try {
      logOutRequest();
    } catch (error) {}
  };

  useRnFocusEffect(() => {
    setUser();
  }, []);

  // useEffect(() => {
  //   console.log('user', user);
  // }, [user]);

  // useEffect(() => {
  //   console.log('userStatus', userStatus);
  // }, [userStatus]);

  return (
    <Container>
      <ContentBox>
        <ActionBox>
          <TouchableOpacity onPress={() => onClose()}>
            <Icon
              name="close-outline"
              style={{ fontSize: 30, color: palette.grayB1, marginLeft: -5 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToEditProfile}>
            <WithLocalSvg asset={require('assets/images/icons/icon_edit.svg')} />
          </TouchableOpacity>
        </ActionBox>
        <InfoBox>
          {userStatus === 'hasValue' &&
            userInfoLabelList.map((item, idx) => (
              <Fragment key={idx}>
                <AppText
                  color={colors.blue}
                  fontWeight={500}
                  fontSize={14}
                  customStyle={{ textTransform: 'capitalize' }}
                >
                  {item.label ? item.label : item.index}
                </AppText>
                <InfoText customStyle={{ paddingLeft: 20 }}>: {userInfo[`${item.index}`]}</InfoText>
              </Fragment>
            ))}
        </InfoBox>
        <LogOutBtn onPress={onSignOut}>
          <AppText
            fontSize={13}
            color={palette.grayB1}
            customStyle={{ textDecorationLine: 'underline' }}
          >
            Logout
          </AppText>
        </LogOutBtn>
      </ContentBox>

      <BottomBox>
        <AppText fontSize={12}>DOF 디오에프</AppText>
        <LinkBox>
          {snsList.map((item, idx) => (
            <SnsLinkBtn url={item.url} key={idx}>
              <FontAwesomeIcon name={item.iconName} style={{ color: '#97999C', fontSize: 22 }} />
            </SnsLinkBtn>
          ))}
        </LinkBox>
      </BottomBox>
    </Container>
  );
}

/* <SnsLinkBtn url="https://www.facebook.com/doflab">
  <FontAwesomeIcon name="facebook" style={{ color: '#97999C', fontSize: 22 }} />
</SnsLinkBtn>
<SnsLinkBtn url="https://www.youtube.com/c/DOFinc">
  <FontAwesomeIcon name="instagram" style={{ color: '#97999C', fontSize: 22 }} />
</SnsLinkBtn>
<SnsLinkBtn url="https://www.instagram.com/dof_inc/">
  <FontAwesomeIcon name="youtube-play" style={{ color: '#97999C', fontSize: 22 }} />
</SnsLinkBtn>
<SnsLinkBtn url="https://www.linkedin.com/company/dof-inc./">
  <FontAwesomeIcon name="linkedin" style={{ color: '#97999C', fontSize: 22 }} />
</SnsLinkBtn> */
