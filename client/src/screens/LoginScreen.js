import React from 'react';

import LoginContainer from '../containers/LoginContainer';
import { Container, H1 } from '../components/common';

const LoginScreen = () => {
  return (
    <Container>
      <H1>Welcome Back!</H1>
      <LoginContainer />
    </Container>
  );
};

export default LoginScreen;
