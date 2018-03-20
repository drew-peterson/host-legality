import React from 'react';
import { withRouter } from 'react-router-dom';
import FlowContainer from '../containers/FlowContainer';
import { Container } from '../components/common';

const FlowScreen = props => {
  const { match: { params } } = props;
  return <Container>{params && <FlowContainer params={params} />}</Container>;
};

export default withRouter(FlowScreen);
