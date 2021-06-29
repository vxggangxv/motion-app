import React, { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, Text, Touchable, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import * as MediaLibrary from 'expo-media-library';
import { screenWidth } from 'utils/constants';
import AppText from 'components/common/AppText';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, palette } from 'styles/utils';
import useCheckSetInput from 'hooks/useCheckSetInput';
import ScreenLayout from 'components/common/ScreenLayout';
import { useRecoilValue } from 'recoil';
import { photosState } from 'store/modules/support';

const Container = styled.View`
  flex: 1;
  width: 100%;
  /* background-color: lightgreen; */
`;
const Top = styled.View`
  flex: 1;
  border: 0 rgba(255, 255, 255, 0.5);
  border-bottom-width: 1px;
`;
const Bottom = styled.View`
  flex: 1;
`;

const ImageBox = styled(TouchableOpacity)`
  border: 0px rgba(255, 255, 255, 0.8);
  border-left-width: ${props => (props.index % 4 === 0 ? 0 : 1)}px;
`;
const IconCheckbox = styled.View`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

export default function SelectPhoto({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [afterLoading, setAfterLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [nextPhotoId, setNextPhotoId] = useState('');
  const [hasNextPage, setHasNextPage] = useState(null);
  const [chosenPhoto, setChosenPhoto] = useState(null);
  // const [chosenPhotos, setChosenPhotos] = useState(null);
  const chosenPhotos = useCheckSetInput(new Set([]));
  // const checkPhotosCount = useRecoilValue(photosState).length;
  const photosCount = route.params.photosCount;
  const maxCheckCount = 5 - photosCount;
  // console.log('maxCheckCount', maxCheckCount);
  const numColumns = 3;

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    // console.log('accessPrivileges', accessPrivileges);
    // accessPrivileges:  'all' | 'limited' | 'none'
    setHasPermission(accessPrivileges);
    // 권한 가능, 다시 묻기 가능 인 경우 사용자에게 권한 다시 매번 묻기
    if (accessPrivileges !== 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none') {
        // setHasPermission(true);
        getPhotos({ first: true });
        // 권한 가능, 다시 묻기 false 인 경우 바로 실행
      } else if (accessPrivileges !== 'none') {
        // setHasPermission(true);
        getPhotos({ first: true });
      }
    }
    // if (accessPrivileges === 'none') setHasPermission(false);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  // 권한 거부시 이동
  useEffect(() => {
    if (hasPermission === 'none') return navigation.navigate('Support');
  }, [hasPermission]);

  const getPhotos = async (config = {}) => {
    const { first, after, refresh } = config;
    if (first) setLoading(true);
    if (after) setAfterLoading(true);
    if (refresh) setRefreshing(true);
    let requestData = {
      first: 40,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };
    requestData = {
      ...requestData,
      after,
    };
    const {
      assets: photos,
      endCursor,
      hasNextPage,
    } = await MediaLibrary.getAssetsAsync(requestData);
    if (first || refresh) {
      setPhotos(photos);
    } else {
      setPhotos(draft => [...draft, ...photos]);
    }
    setNextPhotoId(endCursor);
    setHasNextPage(hasNextPage);
    if (first) setLoading(false);
    if (after) setAfterLoading(false);
    if (refresh) setRefreshing(false);
  };
  // const getPhotos = async () => {
  //   setLoading(true);
  //   const {
  //     assets: photos,
  //     endCursor,
  //     hasNextPage,
  //   } = await MediaLibrary.getAssetsAsync({
  //     first: 40,
  //     sortBy: [MediaLibrary.SortBy.creationTime],
  //   });
  //   setPhotos(photos);
  //   setNextPhotoId(endCursor);
  //   setHasNextPage(hasNextPage);
  //   setChosenPhoto(photos[0]?.uri);
  //   setLoading(false);
  // };
  // const getMorePhotos = async nextId => {
  //   setMoreLoading(true);
  //   const {
  //     assets: photos,
  //     endCursor,
  //     hasNextPage,
  //   } = await MediaLibrary.getAssetsAsync({
  //     first: 40,
  //     after: nextId,
  //     sortBy: [MediaLibrary.SortBy.creationTime],
  //   });
  //   setPhotos(draft => [...draft, ...photos]);
  //   setNextPhotoId(endCursor);
  //   setHasNextPage(hasNextPage);
  //   setMoreLoading(false);
  // };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation.navigate('Support', {
  //             file: chosenPhoto,
  //           })
  //         }
  //       >
  //         <AppText fontSize={14} color="white" customStyle={{ paddingHorizontal: 10 }}>
  //           Next
  //         </AppText>
  //       </TouchableOpacity>
  //     ),
  //   });
  //   console.log('chosenPhoto', chosenPhoto);
  //   console.log('photos', photos);
  // }, [chosenPhoto]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        chosenPhotos.value.size ? (
          <TouchableOpacity
            onPress={() =>
              // navigation.reset({
              //   index: 0,
              //   routes: [
              //     {
              //       name: 'Support',
              //       params: { photos: [...chosenPhotos.value] },
              //     },
              //   ],
              // })
              navigation.navigate('Support', {
                photos: [...chosenPhotos.value],
              })
            }
          >
            <AppText fontSize={14} color="white" customStyle={{ paddingHorizontal: 15 }}>
              Next
            </AppText>
          </TouchableOpacity>
        ) : null,
    });
    // console.log('chosenPhoto', chosenPhoto);
    // console.log('photos', photos);
  }, [chosenPhotos.value.size]);

  useEffect(() => {
    console.log('chosenPhotos.value', chosenPhotos.value);
  }, [chosenPhotos.value]);

  return (
    <ScreenLayout loading={loading}>
      <Container>
        {/* <StatusBar hidden={false} /> */}
        {/* <Top>
        {chosenPhoto !== null && (
          <Image source={{ uri: chosenPhoto }} style={{ width: screenWidth, height: '100%' }} />
        )}
      </Top> */}
        <Bottom>
          <FlatList
            // onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (hasNextPage) getPhotos({ after: nextPhotoId });
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              ></View>
            )}
            refreshing={refreshing}
            onRefresh={() => getPhotos({ refresh: true })}
            data={photos}
            numColumns={numColumns}
            keyExtractor={item => '' + item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.key}
                index={index}
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  borderLeftWidth: index % numColumns === 0 ? 0 : 1,
                }}
                onPress={() => {
                  if (
                    chosenPhotos.value.size === maxCheckCount &&
                    !chosenPhotos.value?.has(item.uri)
                  )
                    return;
                  chosenPhotos.onChange({ value: item.uri });
                }}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: screenWidth / numColumns, height: screenWidth / numColumns }}
                  resizeMode="cover"
                />
                <IconCheckbox>
                  <Icon
                    name="checkmark-circle"
                    size={25}
                    style={{ color: chosenPhotos.value?.has(item.uri) ? 'white' : palette.grayB1 }}
                  />
                </IconCheckbox>
              </TouchableOpacity>
            )}
          />
        </Bottom>
      </Container>
    </ScreenLayout>
  );
}
