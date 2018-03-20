import React from 'react';
import NewHost from '../components/flow/NewHost';
import { Container, H1 } from '../components/common';

import styled from 'styled-components';

export default () => {
  return (
    <Container>
      <NewHostWrap>
        <H1>New Host</H1>
        <NewHost />
      </NewHostWrap>
    </Container>
  );
};

const NewHostWrap = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
`;
