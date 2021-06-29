import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useModal } from 'store/modules/app';
import styled from 'styled-components/native';
import AppText from '../AppText';
import { palette, colors } from 'styles/utils';
import { screenHeight } from 'utils/constants';
import PropTypes from 'prop-types';

const AbsoluteFullScreenStyle = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  justify-content: flex-end;
  position: relative;
  /* height: 83%; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
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
export const OriginModal = React.memo(function OriginModal({
  animationType = 'slide',
  visible = false,
  hasDim = true,
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
}) {
  const { editModal, deleteModal, hideAndDeleteModal } = useModal();

  const hideModal = () => {
    if (key) return deleteModal(key);
    onClose();
  };

  const handleOk = () => {
    onPress();
    hideModal();
  };

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
            <Pressable onPress={hideModal} style={{ flex: 1 }} />
          </PressableDim>
          {hasDefaultStyle ? (
            <ModalContainer>
              <LineCloseBtn onPress={hideModal} />
              {/* {!hideHeader && <ModalHeader><Text>Header</Text></ModalHeader>} */}
              {!hideHeader && <ModalHeader>{header}</ModalHeader>}
              <ModalBody>{renderContent}</ModalBody>
              {!hideFooter && (
                <ModalFooter>
                  <TouchableOpacity onPress={hideModal}>
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

export default OriginModal;

OriginModal.propTypes = {
  header: PropTypes.element,
  renderContent: PropTypes.element,
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelText: PropTypes.element,
};
