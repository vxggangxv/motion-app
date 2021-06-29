import { useReactiveVar } from '@apollo/client';
import FullScreenLoading from 'components/base/loading/FullScreenLoading';
import OriginModalContainer from 'containers/common/OriginModalContainer';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { apiCallingVar } from 'store/apollo';
import styled from 'styled-components';

export default function Core(props) {
  const apiCalling = useReactiveVar(apiCallingVar);

  // useEffect(() => {
  //   console.log('core fetch apiCalling', apiCalling);
  // }, [apiCalling]);

  return (
    <>
      <FullScreenLoading visible={apiCalling} />
      <OriginModalContainer />
    </>
  );
}
