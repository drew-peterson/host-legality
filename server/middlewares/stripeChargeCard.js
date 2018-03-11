const keys = require('../../config/keys');
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);

module.exports = async (req, res, next) => {
  const { amount, token, description } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: description,
      source: token.id
    });
    next(null, charge);
  } catch (error) {
    next(error);
  }
};
