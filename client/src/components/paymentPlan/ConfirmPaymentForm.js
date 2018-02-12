import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PaymentPlanItem from './PaymentPlanItem';

class ConfirmPaymentForm extends Component {
  state = {
    card: null
  };
  componentDidMount() {
    const { planType, plans } = this.props;
    console.log(planType, plans);
    this.setState({ card: plans[planType] });
  }

  render() {
    const { handleSubmit, plans } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <PaymentPlanItem {...this.state.card} />
        <div>
          <button type="submit">Pay</button>
        </div>
      </Form>
    );
  }
}

const Form = styled.form``;

ConfirmPaymentForm = reduxForm({
  form: 'paymentPlan',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ConfirmPaymentForm);

function mapStateToProps({ form: { paymentPlan } }) {
  return { planType: paymentPlan.values.plan };
}
export default connect(mapStateToProps)(ConfirmPaymentForm);
