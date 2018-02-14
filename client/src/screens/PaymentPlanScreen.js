import React from 'react';
// import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Container, H1 } from '../components/common';
import PaymentPlanContainer from '../containers/PaymentPlanContainer';

const PaymentPlanScreen = props => {
  const { match: { params } } = props;
  return (
    <Container>
      <H1>PaymentPlan</H1>
      <PaymentPlanContainer params={params} />
    </Container>
  );
};

export default withRouter(PaymentPlanScreen);
