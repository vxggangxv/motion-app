import { atom, selectorFamily, atomFamily, selector, useRecoilCallback } from 'recoil';
import {
  fetchMachines,
  fetchMachine,
  fetchTools,
  fetchMachineMessage,
  fetchNcFiles,
} from 'api/serial';

// atom
export const triggerState = atomFamily({
  key: 'serial/triggerState',
  default: Date.now(),
});

export const subscribeSerialNumberState = atom({
  key: 'serial/subscribeSerialNumberState',
  default: '',
});

export const machinesQueryState = atom({
  key: 'serial/machinesQueryState',
  default: {
    page: 1,
  },
});

export const machineQueryState = atom({
  key: 'serial/machineQueryState',
  default: null,
});

export const toolsQueryState = atom({
  key: 'serial/toolsQueryState',
  default: '',
});

// selector
export const machinesQuery = selector({
  key: 'serial/machinesQuery',
  get: ({ get }) => {
    console.log('serial/machinesQuery');
    // console.log('get(machinesQueryState)', get(machinesQueryState));
    // if (get(machinesQueryState) === null) return;
    return fetchMachines(get(machinesQueryState)).then(({ data }) => data);
  },
  set: ({ set }, newValue) => {
    console.log('newValue', newValue);
    // set(machinesQueryState, newValue);
  },
});

export const machineQuery = selectorFamily({
  key: 'serial/machineQuery',
  get:
    id =>
    ({ get }) => {
      console.log('serial/machineQuery');
      get(triggerState('serial/machineQuery'));
      return fetchMachine(id).then(({ data }) => data);
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(triggerState('serial/machineQuery'), Date.now());
    },
});

export const ncFilesQuery = selectorFamily({
  key: 'serial/ncFilesQuery',
  get:
    id =>
    ({ get }) => {
      console.log('serial/ncFilesQuery');
      get(triggerState('serial/ncFilesQuery'));
      return fetchNcFiles(id).then(({ data }) => data);
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(triggerState('serial/ncFilesQuery'), Date.now());
    },
});

export const machineMessageQuery = selectorFamily({
  key: 'serial/machineMessageQuery',
  get:
    id =>
    ({ get }) => {
      console.log('serial/machineMessageQuery');
      get(triggerState('serial/machineMessageQuery'));
      return fetchMachineMessage(id).then(({ data }) => data);
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(triggerState('serial/machineMessageQuery'), Date.now());
    },
});

export const toolsQuery = selectorFamily({
  key: 'serial/toolsQuery',
  get:
    id =>
    ({ get }) => {
      console.log('serial/toolsQuery');
      get(triggerState('serial/toolsQuery'));
      return fetchTools(id).then(({ data }) => data);
    },
  set:
    () =>
    ({ set }, newValue) => {
      set(triggerState('serial/toolsQuery'), Date.now());
    },
});

// hook
// react-native의 특성상 goBack이 아닌 navigate.navigate로 이전 페이지 이동시 useEffect 작동 X
// 해결책으로 navigate와 prefetch를 같이 사용해준다. 성능 향상 및 refetch
// 또는 navigation.push를 사용 하고 useEffect에 fetch 를 넣어주는법, 다만 headerLeft에 (페이지를 되돌아와도 새로운 페이지 개념이어서 history위에 계속 추가된다)
export const useSerial = () => {
  const prefetchMachineList = useRecoilCallback(({ snapshot, set }) => () => {
    // snapshot.getLoadable(machinesQuery); // pre-fetch user info
    set(machinesQueryState, { page: 1 }); // change current user to start new render
  });

  const prefetchMachine = useRecoilCallback(({ snapshot, set }) => id => {
    snapshot.getLoadable(machineQuery(id));
  });

  const prefetchToolList = useRecoilCallback(({ snapshot, set }) => () => {
    set(triggerState('serial/toolsQuery'), Date.now());
  });

  return { prefetchMachineList, prefetchMachine, prefetchToolList };
};
