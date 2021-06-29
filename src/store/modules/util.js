import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { fetchCountries } from 'api/util';

const triggerState = atomFamily({
  key: 'util/triggerState',
  default: Date.now(),
});

// export const countryListState = atom({
//   key: 'util/countryListState',
//   default: [],
// });

// set을 통한 refetch가능한 request
export const countriesQuery = selector({
  key: 'util/countriesQuery',
  get: ({ get }) => {
    console.log('util/countriesQuery');
    get(triggerState('util/countriesQuery'));
    return fetchCountries().then(({ data }) => data);
  },

  set: ({ set }, newValue) => {
    set(triggerState('util/countriesQuery'), Date.now());
  },
});
