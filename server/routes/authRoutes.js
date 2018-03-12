const passport = require('passport');

const passportTypes = require('../services/passportTypes');
const googleOAuth = passportTypes.googleOAuth;
const googleOAuthCb = passportTypes.googleOAuthCb;
const facebookOAuth = passportTypes.facebookOAuth;
const facebookOAuthCb = passportTypes.facebookOAuthCb;
const password = require('../middlewares/password');

const oAuthType = (req, res, next) => {
  // help with redirect for oAuth signup / login
  req.app.set('oAuthType', req.query.oAuthType);
  next();
};

module.exports = app => {
  // GOOGLE ------------------------------------------------------
  app.get('/auth/google', oAuthType, googleOAuth);

  // redirect to specific route after passport strategy is model getting user model
  app.get('/auth/google/callback', googleOAuthCb, (req, res) => {
    // console.log('GOOGLE', req.user);
    const oAuthType = app.get('oAuthType');
    console.log('oAuthType', oAuthType);
    if (oAuthType === 'login') {
      return res.redirect('/login');
    }
    return res.redirect('/addProperty');
  });

  // FACEBOOK ------------------------------------------------------
  // app.get('/auth/facebook', facebookOAuth);
  //
  // app.get('/auth/facebook/callback', facebookOAuthCb, (req, res) => {
  //   res.redirect('/login');
  // });

  // OTHER ------------------------------------------------------
  app.get('/api/current_user', (req, res) => {
    // passport deserialize attaches mongoose user model to req.user once authorized
    res.send(req.user);
  });

  // logout
  app.get('/api/logout', (req, res) => {
    req.logout(); // attached by passport, takes cookie and kills the id
    res.redirect('/');
  });

  app.post('/auth/resetPassword/:token', password.reset, (req, res) => {
    res.status(200).send({ user: req.user });
  });

  app.post('/auth/forgotPassword', password.forgot, (req, res) => {
    res
      .status(200)
      .send(`Password reset link was sent to email: ${req.body.email}`);
  });
};
