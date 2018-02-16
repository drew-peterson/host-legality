import React from 'react';
import styled from 'styled-components';
import { H1, Button } from '../../components/common';

export default props => {
  return (
    <Wrap>
      <H1>Complete</H1>
      <Button to="/dashboard">Dashboard</Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
