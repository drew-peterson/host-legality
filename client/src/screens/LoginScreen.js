import React from 'react';

import LoginContainer from '../containers/LoginContainer';
import { Link } from 'react-router-dom';
import { Container, H1 } from '../components/common';

const LoginScreen = () => {
  return (
    <Container>
      <H1>Welcome Back!</H1>
      <LoginContainer />

      <Link to="/forgotPassword">Forgot Password?</Link>
    </Container>
  );
};

export default LoginScreen;
