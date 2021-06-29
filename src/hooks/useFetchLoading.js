import React from 'react';
import { useDidUpdateEffect } from 'lib/utils';
import { useCallback, useMemo, useState } from 'react';

/**
 * @params {object} : defaultValue - fetchList, 랜더링 전 api response success 확인용
 * redux에서 api call 이후 init으로 돌아가기때문에 init의 값을 제외했을 경우의 상태를 갖도록 만든
 */
export default defaultValue => {
  // console.log(defaultValue, 'defaultValue');
  const fetchSuccessListInitValue = Object.keys(defaultValue).reduce((acc, curr) => {
    const obj = { [curr]: null };
    return Object.assign(acc, obj);
  }, {});
  // console.log(fetchSuccessListInitValue, 'fetchSuccessListInitValue');
  const [fetchSuccessList, setFetchSuccessList] = useState(fetchSuccessListInitValue);
  const [isFetchSuccess, setIsFetchSuccess] = useState('');

  // dependency에 비교값 success === true
  const fetchListValue = Object.keys(defaultValue).reduce((acc, curr) => {
    return acc.concat(defaultValue[curr] === true);
  }, []);
  // console.log(fetchListValue, 'fetchListValue');

  // 각 fetch요소별 성공여부 값
  const loadingList = Object.keys(fetchSuccessList).reduce((acc, curr) => {
    return acc.concat(fetchSuccessList[curr]);
  }, []);
  // console.log(loadingList, 'loadingList');

  // fetch 성공시 해당fetch 에 true 값 적용
  useDidUpdateEffect(() => {
    // console.log(' work?? number?');
    for (const key in defaultValue) {
      const inValue = defaultValue[key];
      // console.log(inValue, 'inValue');
      // 성공 이후, init시점 null 값이 들어가는걸 방지
      if (inValue !== null) setFetchSuccessList(draft => ({ ...draft, [key]: inValue }));
    }

    setIsFetchSuccess(loadingList.every(item => item === true));
  }, [...fetchListValue]);

  // console.log(isFetchSuccess, 'isFetchSuccess');
  return useMemo(() => ({ isFetchSuccess }), [defaultValue]);
};
