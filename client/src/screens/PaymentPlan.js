import React, { Component } from 'react';
import { Container, H1, rem } from '../components/common';
import { reduxForm } from 'redux-form';

import ChoosePlanForm from '../components/paymentPlan/ChoosePlanForm';
import ConfirmPaymentForm from '../components/paymentPlan/ConfirmPaymentForm';

class PaymentPlan extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.state = {
      page: 1
    };
  }
  onSubmitForm(values) {
    console.log('value', values);
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  renderPage() {
    const { page } = this.state;
    switch (page) {
      case 1:
        return <ChoosePlanForm onSubmit={this.nextPage} plans={this.Plans} />;
      case 2:
        return (
          <ConfirmPaymentForm onSubmit={this.onSubmitForm} plans={this.Plans} />
        );
      default:
        return <ChoosePlanForm onSubmit={this.nextPage} />;
    }
  }

  render() {
    return (
      <Container>
        {this.state.page > 1 && (
          <button onClick={this.previousPage}>BACK</button>
        )}
        <H1 style={styles.headerStyle}>
          Which package would you like for this Airbnb property?
        </H1>
        {this.renderPage()}
      </Container>
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

const styles = {
  headerStyle: {
    maxWidth: rem(632),
    margin: '0 auto'
  }
};

export default reduxForm({
  form: 'paymentPlan',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PaymentPlan);
