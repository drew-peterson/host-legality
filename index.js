const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

// Models -- make first!
require('./server/models');
require('./server/services/passport'); // make sure passport is ran...

// GRAPHQL
const { graphqlExpress } = require('apollo-server-express');
const { graphiqlExpress } = require('apollo-server-express');
const schema = require('./server/graphql/schema');

const keys = require('./config/keys');
const handleErrors = require('./server/middlewares/errors');

mongoose.connect(keys.MONGO_URI);

const app = express();

app.use(bodyParser.json());

// use cookies inside app
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie lasts 30days in milliseconds,
    keys: [keys.COOKIE_KEY]
  })
);

// tell passport to use cookies...
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/authRoutes')(app); // bring in authRoutes function and call it with app

// ROUTES - GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({ schema, context: req }))
);

if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );
}

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  // Express will serve up production assesset (main.js, main.css) files
  app.use(express.static('client/build')); // check for specific file request is looking for -- index.html will ask for main.js in client/build/static/js...
  // Express will serve up index.html if it doesn not reconize the route
  // if it does not find file inside client/build then just return index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(handleErrors.logErrors);
app.use(handleErrors.clientErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
