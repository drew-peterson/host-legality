import React from 'react';
import styled from 'styled-components';
import PropertyListContainer from '../containers/PropertyListContainer';
import { Container, H1, rem, Button } from '../components/common';

const DashBoardScreen = () => {
  return (
    <Container>
      <H1>My Properties</H1>
      <ContainerWrap className="containerWrap">
        <PropertyListContainer />
        <BtnWrap>
          <Button to="/addProperty">Add a new property</Button>
        </BtnWrap>
      </ContainerWrap>
    </Container>
  );
};

const ContainerWrap = styled.div`
  margin-top: ${rem(35)};
`;

const BtnWrap = styled.div`
  margin-top: ${rem(25)};
`;

export default DashBoardScreen;
