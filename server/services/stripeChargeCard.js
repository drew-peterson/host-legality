const keys = require('../../config/keys');
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);
module.exports = ({ amount, tokenID, description }) => {
  return stripe.charges.create({
    amount: amount * 100,
    currency: 'usd',
    description: description,
    source: tokenID
  });
};
