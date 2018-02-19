import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { Button } from '../common';

class StripePayment extends Component {
  render() {
    const { btnText, description, amount, handlePay } = this.props;

    return (
      <StripeCheckout
        name="Host Legality"
        description={description}
        amount={amount * 100} // in cents
        token={handlePay}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <Button type="button">{btnText}</Button>
      </StripeCheckout>
    );
  }
}

export default StripePayment;
