import React from 'react';

import { Container, H1 } from '../components/common';
import SignupContainer from '../containers/SignupContainer';

const SignupScreen = () => {
  return (
    <Container>
      <H1>Get Started!</H1>
      <SignupContainer />
    </Container>
  );
};

export default SignupScreen;
