import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAlert, useModal } from 'store/modules/app';
import styled from 'styled-components/native';
import AppText from '../AppText';
import { palette, colors } from 'styles/utils';
import { screenHeight } from 'utils/constants';
import PropTypes from 'prop-types';
import { color } from 'react-native-reanimated';

const AbsoluteFullScreenStyle = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled(AbsoluteFullScreenStyle)`
  align-items: center;
  justify-content: center;
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
  justify-content: flex-end;
  position: relative;
  /* height: 83%; */
  width: 80%;
  background-color: white;
  border-radius: 10px;
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
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 110px;
  padding: 0 10px;
  /* text-align: center; */
  /* background-color: red; */
`;

const ModalFooter = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  border: 0px solid ${palette.grayB1};
  border-top-width: ${props => (props.hasBorder ? 1 : 0)}px;
`;

const ActionBtn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 45px;
  /* background-color: ${props => (props.disabled ? colors.disableDefault : colors.blue)}; */
`;

const OkBtn = styled(ActionBtn)`
  /* background-color: ${props => (props.disabled ? colors.disableDefault : colors.blue)}; */
  /* background-color: ${props => (props.hasColor ? colors.blue : colors.disableDefault)}; */
  background-color: ${props => (props.hasColor ? colors.disableDefault : 'white')};
  border-bottom-left-radius: ${props => (props.hasColor ? 10 : 0)}px;
  border-bottom-right-radius: 10px;
  border: 0px solid ${palette.grayB1};
  border-left-width: ${props => (props.hasBorderLeft ? 1 : 0)}px;
`;

const CancelBtn = styled(ActionBtn)`
  border-bottom-left-radius: 10px;
  /* background-color: ${palette.grayB1}; */
`;

/**
 * @param {reactElement} header
 * @param {reactElement} renderContent
 * @param {string | reactElement} okText
 * @param {reactElement} cancelText
 */
export const OriginModal = React.memo(function OriginModal({
  animationType = 'fade',
  visible = false,
  hasDim = true,
  hasDefaultStyle = true,
  header,
  okText = 'Ok',
  disabledOk = false,
  cancelText = '',
  etcButtons = [], // 차후 여러개 버튼 적용 필요시 추가개발
  hideHeader = false,
  hideFooter = false,
  index = '',
  renderContent = '',
  onPress = () => {},
  onClose = () => {},
  onCancel = () => {},
}) {
  const ActionBtnLength = !!cancelText ? etcButtons.length + 2 : etcButtons.length + 1;
  const { editAlert, hideAlert, hideAndDeleteAlert } = useAlert();

  const handleClose = () => {
    // if (index) return hideAlert();
    console.log('handleClose');
    hideAlert();
    onClose();
  };

  const handleOk = () => {
    onPress();
    hideAlert();
  };

  const handleCancel = () => {};

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={visible} style={{ zIndex: 0 }}>
        <Dim hasDim={hasDim} />
      </Modal>
      <Modal
        style={{ zIndex: 1 }}
        animationType={animationType}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}
        onDismiss={() => {
          // console.log('dismiss');
          // deleteModal(key);
        }}
      >
        <Container>
          <PressableDim>
            <Pressable onPress={handleClose} style={{ flex: 1 }} />
          </PressableDim>
          {hasDefaultStyle ? (
            <ModalContainer>
              {/* {!hideHeader && <ModalHeader>{header}</ModalHeader>} */}
              <ModalBody>
                {typeof renderContent === 'string' ? (
                  <AppText fontSize={15} fontWeight={500} customStyle={{ textAlign: 'center' }}>
                    {renderContent}
                  </AppText>
                ) : (
                  <>{renderContent}</>
                )}
              </ModalBody>
              {!hideFooter && (
                <ModalFooter hasBorder={ActionBtnLength === 2}>
                  {!!cancelText && (
                    <CancelBtn onPress={handleClose}>
                      {typeof cancelText === 'string' ? (
                        <AppText
                          color={colors.blue}
                          // fontStyle="italic"
                          fontSize={21}
                          fontWeight={500}
                          customStyle={{ letterSpacing: 1 }}
                        >
                          {cancelText}
                        </AppText>
                      ) : (
                        <>{cancelText}</>
                      )}
                    </CancelBtn>
                  )}
                  <OkBtn
                    onPress={handleOk}
                    disabled={disabledOk}
                    hasColor={ActionBtnLength === 1}
                    hasBorderLeft={ActionBtnLength === 2}
                  >
                    {typeof okText === 'string' ? (
                      <AppText
                        fontSize={21}
                        color={ActionBtnLength === 1 ? 'white' : colors.blue}
                        fontStyle={ActionBtnLength === 1 ? 'italic' : 'normal'}
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

export default OriginModal;

OriginModal.propTypes = {
  // header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  renderContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
