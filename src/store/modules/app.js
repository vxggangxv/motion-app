import React, { useEffect } from 'react';
import Terms from 'components/base/terms/Terms';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

export const modalState = atom({
  key: 'app/modalState',
  default: [],
  // default: [
  //   {
  //     visible: true,
  //     hasDim: true,
  //     hasDefaultStyle: true,
  //     renderContent: <Terms />,
  //   },
  // ],
});

export const alertState = atom({
  key: 'app/alertState',
  default: {
    visible: false,
  },
  // default: [
  //   {
  //     visible: true,
  //     hasDim: true,
  //     hasDefaultStyle: true,
  //     renderContent: <Terms />,
  //   },
  // ],
});

export const sharedModalState = atom({
  key: 'app/sharedModalState',
  default: {
    visible: false,
    modalName: '',
    params: {},
    options: {
      hasDefaultStyle: false,
      // animationIn,
      // animationOut,
      // swipeDirection,
      // renderContent,
      // onPress,
      // onClose,
    },
  },
});

// Usage
// setSharedModal({
//   visible: true,
//   modalName: 'Profile',
//   options: {
//     hasDefaultStyle: false,
//   }
// })

/**
 * 다중 모달, 사용 X, react performance issue 해결 필요, 필요시 추가 개발
 * AppModal state management hook
 * component안에서 사용, unmount할 경우 사용시 error
 */
export const useModal = () => {
  // const setModal = useSetRecoilState(modalState);
  const [modal, setModal] = useRecoilState(modalState);
  // console.log('useModal modal', modal);

  // useEffect(() => {
  //   console.log('modal', modal);
  // }, [modal]);

  /**
   * uniq한 키값 입력, 중복시 추가 안됨
   * hasTemplate 기본 false
   * hasTemplate: false 일경우, 해당 render component 전달 ex) data: {  renderContent, renderContentOptions }
   * hasDefaultStyle 기본 모달 Style, 기본 true
   * TODO: 차후 기본 template 제작
   * hasTemplate: true 일경우, 해당 text값 전달 ex) data: {  hasTemplate, title, content, ok, cancel }
   * @param {object} data
   */
  const addModal = data => {
    // obj 기본값 설정
    // const obj = {
    //   visible: false,
    //   hasDim: true,
    //   hasDefaultStyle: true,
    //   okText: 'Ok',
    //   renderContent,
    // };
    setModal(draft => {
      if (!draft.includes(data.index)) return [...draft, data];
      // if (draft.includes(data.index)) return draft;
      // return [...draft, obj];
    });
  };

  const editModal = data => {
    // console.log('receive data', data);
    setModal(draft =>
      draft.map(item => {
        return item.index === data.index ? { ...item, ...data } : item;
      }),
    );
  };

  const deleteModal = index => {
    setModal(draft => {
      return draft.filter(item => item.index !== index);
    });
  };

  const resetModal = () => {
    setModal([]);
  };

  return { addModal, editModal, deleteModal, resetModal };
};

/**
 * AppAlert state management hook, 단일 Alert
 * component안에서 사용, unmount할 경우 사용시 error
 */
export const useAlert = () => {
  const [modal, setAlert] = useRecoilState(alertState);

  /**
   * uniq한 키값 입력, 중복시 추가 안됨
   * hasTemplate 기본 false
   * hasTemplate: false 일경우, 해당 render component 전달 ex) data: { key, renderContent, renderContentOptions }
   * hasDefaultStyle 기본 모달 Style, 기본 true
   * TODO: 차후 기본 template 제작
   * hasTemplate: true 일경우, 해당 text값 전달 ex) data: { hasTemplate, title, content, ok, cancel }
   * @param {object} data
   */
  const addAlert = data => {
    setAlert(data);
  };

  const editAlert = data => {
    // console.log('receive data', data);
    setAlert(draft => ({ ...draft, ...data }));
  };

  const hideAlert = index => {
    setAlert({
      visible: false,
    });
  };

  return { addAlert, editAlert, hideAlert };
};
