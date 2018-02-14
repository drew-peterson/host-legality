import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import styled from 'styled-components';

import PaymentPlanItem from '../../components/paymentPlan/PaymentPlanItem';
import StripePayment from '../../components/shared/StripePayment';

class ConfirmPlanPaymentForm extends Component {
  state = {
    card: null,
    showStipe: false
  };
  componentDidMount() {
    const { planType, plans } = this.props;
    this.setState({ card: plans[planType] });
  }

  handlePay(token) {
    const { dispatch, form, handleSubmit } = this.props;
    dispatch(change(form, 'token', token));
    handleSubmit();
  }

  renderStripePayment() {
    const { card } = this.state;
    const { form } = this.props;
    if (card) {
      const { amount, description } = card;
      return (
        <StripePayment
          btnText="Continue"
          form={form}
          handlePay={this.handlePay.bind(this)}
          description={description}
          amount={amount}
        />
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { card } = this.state;
    return (
      <Form onSubmit={handleSubmit}>
        <PaymentPlanItem {...card} />

        <div>{this.renderStripePayment()}</div>
      </Form>
    );
  }
}

const Form = styled.form``;

export default reduxForm({
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ConfirmPlanPaymentForm);

// function mapStateToProps({ form: { paymentPlan } }) {
//   return { planType: paymentPlan.values.plan };
// }
