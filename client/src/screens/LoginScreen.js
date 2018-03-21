import React from 'react';

import LoginContainer from '../containers/LoginContainer';
import { Link } from 'react-router-dom';
import { Container, H1, rem } from '../components/common';
import styled from 'styled-components';

const LoginScreen = () => {
  return (
    <Container>
      <H1>Welcome Back!</H1>
      <LoginContainer />
      <BtnWrap>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </BtnWrap>
    </Container>
  );
};

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${rem(25)};
`;

export default LoginScreen;
