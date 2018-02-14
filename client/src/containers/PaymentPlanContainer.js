import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { formValueSelector } from 'redux-form';

import PaymentPlanForm from '../forms/PaymentPlanForm';

class PaymentPlanContainer extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      page: 1
    };
  }
  onSubmitForm({ plan, token }) {
    const { stripeHandleToken } = this.props;
    const { amount, description } = this.Plans[plan];
    //process strip...
    stripeHandleToken({ token, amount, description });
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { property, planType } = this.props;
    const { page } = this.state;
    return (
      <PaymentPlanForm
        property={property}
        nextPage={this.nextPage}
        previousPage={this.previousPage}
        onSubmitForm={this.onSubmitForm}
        form="paymentPlan"
        page={page}
        plans={this.Plans}
        planType={planType}
      />
    );
  }

  Plans = {
    basic: {
      type: 'Basic',
      amount: 30,
      description: 'Concierge customer support Customized workflow 1 property'
    },
    standard: {
      type: 'Standard',
      amount: 25,
      description: 'Concierge customer support Customized workflow 1 property'
    },
    premium: {
      type: 'Premium',
      amount: 50,
      description: 'Concierge customer support Customized workflow 1 property'
    }
  };
}

function mapStateToProps(state, { params }) {
  const { properties } = state;
  const { propertyId } = params;
  const selector = formValueSelector('paymentPlan');
  if (properties) {
    return {
      property: properties[propertyId],
      planType: selector(state, 'plan') //how you pass reduxForm props that dont exist yet...
    };
  }
  return {};
}

export default connect(mapStateToProps, actions)(PaymentPlanContainer);
