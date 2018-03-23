import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import _ from 'lodash';
import { reduxForm } from 'redux-form';

import { Row, Col } from 'react-flexbox-grid';
import PaymentPlanItem from '../../components/paymentPlan/PaymentPlanItem';
import { rem } from '../../components/common';

const ChoosePlanForm = props => {
  const { handleSubmit, plans } = props;
  const renderPlanItem = props => {
    return (
      <Row center="xs" between="md">
        {_.map(plans, (plan, key) => {
          return (
            <Col xs={12} md={4} key={key}>
              <PaymentPlanItem
                {...plan}
                {...props}
                id={key}
                handleSubmit={handleSubmit}
              />
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <Form onSubmit={handleSubmit} className="choosePlanForm">
      <Field name="plan" component={renderPlanItem} />
    </Form>
  );
};

const Form = styled.form`
  margin-top: ${rem(100)};
`;

export default reduxForm({
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ChoosePlanForm);
