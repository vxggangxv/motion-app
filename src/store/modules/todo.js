import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { fetchTodo, fetchTodos } from 'api/todo';
import axios from 'axios';

const triggerState = atomFamily({
  key: 'todo/triggerState',
  default: Date.now(),
});

export const todoState = atom({
  key: 'todo/todoState',
  default: null,
});

export const todoListState = atom({
  key: 'todo/todoListState',
  default: [],
});

// QueryState연결시 trigger 불필요
// set을 통한 refetch가능한 request
export const todosQuery = selector({
  key: 'todo/todosQuery',
  get: ({ get }) => {
    console.log('todo/todosQuery');
    get(triggerState('todo/todosQuery'));
    return fetchTodos().then(({ data }) => data);
  },
  // get: async ({ get }) => {
  //   try {
  //     console.log('todo/todosQuery');
  //     get(triggerState('todo/todosQuery'));
  //     const response = await fetchTodos();
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  set: ({ set }, newValue) => {
    set(triggerState('todo/todosQuery'), Date.now());
  },
});

export const todoQuery = selectorFamily({
  key: 'todo/todoQuery',
  get:
    id =>
    ({ get }) => {
      console.log('todo/todoQuery');
      get(triggerState('todo/todoQuery'));
      return fetchTodo(id).then(({ data }) => data);
    },
  // async ({ get }) => {
  //   try {
  //     console.log('todo/todoQuery');
  //     get(triggerState('todo/todoQuery'));
  //     const response = await fetchTodo(id);
  //     // const response = await axios.get(`https://jsonplaceholder.typicode.com/todosa/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.log('에러 발생', error);
  //     console.log('error.response.status', error?.response?.status);
  //     throw error;
  //   }
  // },
  set:
    () =>
    ({ set }, newValue) => {
      set(triggerState('todo/todoQuery'), Date.now());
    },
});
