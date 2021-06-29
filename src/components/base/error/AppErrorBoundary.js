import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Notice = styled.Text`
  padding: 50px;
  font-size: 14px;
  text-align: center;
`;

class AppErrorBoundary extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { error: null, errorInfo: null };
  // }
  state = { hasError: false, error: null, errorInfo: null, status: null };
  // error = {}

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('error.response.status', error?.response?.status);
    // console.log('에러가 발생했습니다.');
    this.setState({ ...this.state, error, errorInfo, status: error?.response?.status });
    // TODO: status에 따른 toast 알림
    // You can also log error messages to an error reporting service here
    // if (ENV_MODE_PROD) axios.post(endPoint.post_error_meesage, errorData);
  }

  // componentDidMount() {
  //   console.log('isDevMode?', process.env.NODE_ENV === 'development');
  // }

  render() {
    // console.log(this.state.error, 'this.state.error');
    const { hasError, error, errorInfo } = this.state;
    // console.log('hasError', hasError);
    // console.log('error', error);
    // console.log('errorInfo', errorInfo);

    if (hasError) {
      // Error path
      return (
        <Container>
          {process.env.NODE_ENV === 'development' ? (
            <View>
              <Notice>{String(error)}</Notice>
              <Notice>{errorInfo?.componentStack}</Notice>
            </View>
          ) : (
            <View>
              <Notice>
                The server encountered an misconfiguration and was unable to complete your request.
              </Notice>
            </View>
          )}
        </Container>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default AppErrorBoundary;

// <Notice>{errorInfo?.componentStack}</Notice>
// <ErrorForm
//   code="Error"
//   infoText={
//     'The server encountered an misconfiguration and was unable to complete your request.'
//   }
//   linkText={'Refresh'}
// />
