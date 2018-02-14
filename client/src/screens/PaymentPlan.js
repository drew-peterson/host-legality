import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, H1, rem, Subheader } from '../components/common';
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

  renderBackBtn() {
    const { page } = this.state;
    if (page > 1) {
      return <button onClick={this.previousPage}>BACK</button>;
    }
    return <Link to="/dashboard">BACK</Link>;
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
    const { property } = this.props;
    return (
      <Container>
        {this.renderBackBtn()}
        <H1 style={styles.headerStyle}>Which package would you like for:</H1>
        {property && (
          <Subheader style={styles.addressSubHeaderStyle}>
            {property.address}
          </Subheader>
        )}
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
  },
  addressSubHeaderStyle: {
    textAlign: 'center'
  }
};

PaymentPlan = reduxForm({
  form: 'paymentPlan',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PaymentPlan);

function mapStateToProps({ properties }, { match: { params } }) {
  const { propertyId } = params;
  return { property: properties[propertyId] };
}

export default connect(mapStateToProps)(PaymentPlan);
