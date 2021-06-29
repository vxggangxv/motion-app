import { atom, atomFamily, selector, selectorFamily, useRecoilCallback } from 'recoil';
import { fetchProfile } from 'api/user';
import { saveUser, tokenVar } from 'store/apollo';
import axios from 'axios';

const triggerState = atomFamily({
  key: 'user/triggerState',
  default: Date.now(),
});

// export const countryListState = atom({
//   key: 'user/countryListState',
//   default: [],
// });

// set을 통한 refetch가능한 request
export const userQuery = selector({
  key: 'user/userQuery',
  get: ({ get }) => {
    console.log('user/userQuery');
    get(triggerState('user/userQuery'));
    return fetchProfile().then(({ data }) => data);
  },

  set: ({ set }, newValue) => {
    set(triggerState('user/userQuery'), Date.now());
  },
});

// hook
export const useUser = () => {
  const prefetchUser = useRecoilCallback(({ snapshot, set }) => () => {
    set(triggerState('user/userQuery'), Date.now());
  });

  return { prefetchUser };
};
