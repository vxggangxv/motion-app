import React, { Fragment, useEffect } from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { alertState } from 'store/modules/app';
import styled from 'styled-components/native';
import OriginModal from 'components/common/modal/OriginModal';

export default function OriginModalContainer() {
  const alert = useRecoilValue(alertState);

  // useEffect(() => {
  //   console.log('alert', alert);
  // }, [alert]);

  return <OriginModal index={Date.now()} {...alert} />;
}
