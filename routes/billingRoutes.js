const keys = require('../config/keys');

const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

// add our custom middleware to prevent people not logged in to access route
// you can add more middleWare to each route with , however express says one has to res.send back information to client
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const { token, amount, description } = req.body;

    // most likely will make stripePayment a seperatemiddleware
    // need property id to associate with propties model
    // will update property status to active/paid

    // charage card > update property > return updated property

    try {
      const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: 'usd',
        description: description,
        source: token.id
      });
      console.log('charge', charge);
      // req.user is the user model so you can save and such....
      // req.user.credits += 20;
      // const user = await req.user.save();
      res.send({ charge });
    } catch (error) {
      res.status(422).send({ error });
    }
  });
};
