import React from 'react';
import { withRouter } from 'react-router-dom';
import FlowContainer from '../containers/FlowContainer';
import { Container } from '../components/common';
import host from '../utils/dynamicForm/form.json';

const FlowScreen = props => {
  const { match: { params } } = props;
  return (
    <Container>
      {params && <FlowContainer params={params} host={host} />}
    </Container>
  );
};

export default withRouter(FlowScreen);
