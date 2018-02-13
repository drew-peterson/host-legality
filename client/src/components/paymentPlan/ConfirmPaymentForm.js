import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PaymentPlanItem from './PaymentPlanItem';
import StripePayment from '../shared/StripePayment';

class ConfirmPaymentForm extends Component {
  state = {
    card: null,
    showStipe: false
  };
  componentDidMount() {
    const { planType, plans } = this.props;
    this.setState({ card: plans[planType] });
  }

  renderStripePayment() {
    const { card } = this.state;
    if (card) {
      const { amount, description } = card;
      return (
        <StripePayment
          btnText="Continue"
          description={description}
          amount={amount}
        />
      );
    }
  }

  render() {
    const { handleSubmit, plans } = this.props;
    const { card, showStripe } = this.state;
    return (
      <Form onSubmit={handleSubmit}>
        <PaymentPlanItem {...card} />

        <div>{this.renderStripePayment()}</div>
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
