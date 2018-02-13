import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../../actions';

import { Button } from '../common';

class StripePayment extends Component {
  onPay(token) {
    const { amount, stripeHandleToken, description } = this.props;
    stripeHandleToken({ token, amount, description });
  }

  render() {
    const { btnText, description, amount } = this.props;
    return (
      <StripeCheckout
        name="Host Legality"
        description={description}
        amount={amount * 100} // in cents
        token={this.onPay.bind(this)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <Button>{btnText}</Button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(StripePayment);
