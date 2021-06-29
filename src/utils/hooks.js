import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';

/**
 * DidUpdateMount를 구현한 Custom hooks, useEffect를 쓰면 한번 읽히는 것을 방지하기 위한 최적화 작업
 * @param {*} fn
 * @param {*} inputs
 */
export function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
}

/**
 * reactnavigation 용
 */
export function useRnFocusEffect(fn, inputs) {
  useFocusEffect(
    React.useCallback(() => {
      fn();
    }, inputs),
  );
}
