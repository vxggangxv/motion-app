import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { colors } from 'styles/utils';

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${colors.navy};
`;

// const Logo = styled.Image`
//   max-width: 50%;
//   width: 100%;
//   height: 100px;
//   margin: 0 auto;
//   margin-bottom: 20px;
// `;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            height: '100%',
            // backgroundColor: 'black',
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : -30}
        >
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
