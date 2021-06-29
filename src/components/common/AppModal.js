import React from 'react';
import { Alert, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useModal } from 'store/modules/app';
import styled from 'styled-components/native';
import AppText from './AppText';
import { palette, colors } from 'styles/utils';
import { screenHeight } from 'utils/constants';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import SwipeGesture from './gesture/SwipeGesture';

const AbsoluteFullScreenStyle = styled.View`
  flex: 1;
  width: 100%;
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
`;

const Container = styled(AbsoluteFullScreenStyle)`
  justify-content: flex-end;
  position: relative;
  /* background-color: yellowgreen; */
`;

const Dim = styled(AbsoluteFullScreenStyle)`
  background-color: ${props => props.hasDim && 'rgba(0, 0, 0, 0.5)'};
  /* background-color: pink; */
`;
const PressableDim = styled(AbsoluteFullScreenStyle)`
  /* background-color: orange; */
`;

const ModalHeight = screenHeight * 0.8;
const ModalHeaderHeight = 50;
const ModalFooterHeight = 57;
const ModalBodyHeight = ModalHeight - ModalHeaderHeight - ModalFooterHeight;

const ModalContainer = styled.View`
  /* flex: 1; */
  justify-content: flex-end;
  position: relative;
  /* height: 83%; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
`;

const LineClose = styled.View`
  width: 33%;
  height: 7px;
  margin: 8px auto 0;
  /* height: 5px;
  margin: 10px auto 0; */
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const LineCloseBtn = styled(TouchableOpacity)`
  width: 33%;
  height: 7px;
  margin: 8px auto 0;
  /* height: 5px;
  margin: 10px auto 0; */
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  /* border: 1px solid green; */
`;

const ModalBody = styled.View`
  position: relative;
  /* background-color: red; */
`;

const ModalFooter = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px 0 30px;
  background-color: white;
`;

const OkBtn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 57px;
  background-color: ${props => (props.disabled ? colors.disableDefault : colors.blue)};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

/**
 * @param {reactElement} header
 * @param {reactElement} renderContent
 * @param {string | reactElement} okText
 * @param {reactElement} cancelText
 */
export const AppModal = React.memo(function AppModal({
  // animationType = 'slide',
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  animationInTiming = 300,
  visible = false,
  // hasDim = true,
  hasBackdrop = true,
  // backdropColor = 'black',
  backdropOpacity = 0.5,
  swipeDirection = ['down'],
  propagateSwipe = true,
  scrollHorizontal = true,
  panResponderThreshold = 3, // default 4
  // scrollTo = null,
  // scrollOffset = 0,
  // scrollOffsetMax = 0,
  // swipeGesture - 모달 상단 바 swipe이벤트
  // hasSwipeGesture,
  swipeGestureDirection = ['down'],
  onSwipeGestureUp,
  onSwipeGestureDown,
  onSwipeGestureLeft,
  onSwipeGestureRight,
  onSwipeGestureComplete,
  hasDefaultStyle = true,
  header,
  okText = 'Ok',
  disabledOk = false,
  cancelText = '',
  hideHeader = false,
  hideFooter = false,
  key = '',
  renderContent,
  onPress = () => {},
  onClose = () => {},
  onCancel = () => {},
}) {
  const { editModal, deleteModal, hideAndDeleteModal } = useModal();

  const handleClose = () => {
    // if (key) return deleteModal(key);
    onClose();
  };

  const handleOk = () => {
    onPress();
    onClose();
  };

  return (
    <>
      {/* <Modal animationType="fade" transparent={true} visible={visible} style={{ zIndex: 0 }}>
        <Dim hasDim={hasDim} />
      </Modal> */}
      <Modal
        style={{ margin: 0 }}
        // animationType={animationType}
        animationIn={animationIn}
        animationOut={animationOut}
        animationInTiming={animationInTiming}
        transparent={true}
        // visible={visible}
        isVisible={visible}
        hasBackdrop={hasBackdrop}
        backdropOpacity={backdropOpacity}
        // swipeDirection={['up', 'left', 'right', 'down']}
        swipeDirection={swipeDirection}
        propagateSwipe={propagateSwipe}
        scrollHorizontal={scrollHorizontal}
        panResponderThreshold={panResponderThreshold}
        // scrollTo={scrollTo}
        // scrollOffset={scrollOffset}
        // scrollOffsetMax={scrollOffsetMax}
        onSwipeComplete={handleClose}
        onBackdropPress={handleClose}
        onModalHide={() => null}
        // onRequestClose={() => {
        //   // Alert.alert('Modal has been closed.');
        // }}
        // onDismiss={() => {
        //   // console.log('dismiss');
        //   // deleteModal(key);
        // }}
      >
        <Container>
          {hasDefaultStyle ? (
            <ModalContainer>
              {!swipeDirection ? (
                <SwipeGesture
                  direction={swipeGestureDirection}
                  onSwipeGestureUp={onSwipeGestureUp}
                  onSwipeGestureDown={onSwipeGestureDown}
                  onSwipeGestureLeft={onSwipeGestureLeft}
                  onSwipeGestureRight={onSwipeGestureRight}
                  onSwipeGestureComplete={onSwipeGestureComplete}
                >
                  <LineCloseBtn onPress={handleClose} />
                  {!hideHeader && <ModalHeader>{header}</ModalHeader>}
                </SwipeGesture>
              ) : (
                <>
                  <LineClose onPress={handleClose} />
                  {!hideHeader && <ModalHeader>{header}</ModalHeader>}
                </>
              )}
              <ModalBody>{renderContent}</ModalBody>
              {!hideFooter && (
                <ModalFooter>
                  <TouchableOpacity onPress={handleClose}>
                    <AppText>
                      {cancelText ? (
                        <>{cancelText}</>
                      ) : (
                        <Icon
                          name="close-outline"
                          style={{ fontSize: 32, color: palette.grayB1 }}
                        />
                      )}
                    </AppText>
                  </TouchableOpacity>
                  <OkBtn onPress={handleOk} disabled={disabledOk}>
                    {typeof okText === 'string' ? (
                      <AppText
                        color="white"
                        fontSize={21}
                        fontStyle="italic"
                        fontWeight={500}
                        customStyle={{ letterSpacing: 1 }}
                      >
                        {okText}
                      </AppText>
                    ) : (
                      <>{okText}</>
                    )}
                  </OkBtn>
                </ModalFooter>
              )}
            </ModalContainer>
          ) : (
            <>{renderContent}</>
          )}
        </Container>
      </Modal>
    </>
  );
});

export default AppModal;

AppModal.propTypes = {
  header: PropTypes.element,
  renderContent: PropTypes.element,
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelText: PropTypes.element,
};
