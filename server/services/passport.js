// OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../../config/keys');

const User = mongoose.model('User'); // bring in mongo class

// generate unqiue indenityfing info
// turn mongoose model into id
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is not _oAuthId --> referring to user._id (mongo id) for specific user
});
// id: is the above user.id
// turn id into mongoose model and attached to req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google
// https://developers.google.com/identity/one-tap/web/get-started -- new google login??
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // passport as correct domain
      proxy: true // tell passport to trust proxy and keep https for callback
    },
    (accessToken, refreshToken, profile, done) => {
      const data = {
        _oAuthId: profile.id
      };
      newOrExistingUser(data, done);
    }
  )
);

// Facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.FACEBOOK_APP_ID,
//       clientSecret: keys.FACEBOOK_APP_SECRET,
//       callbackURL: '/auth/facebook/callback',
//       proxy: true
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const data = {
//         _oAuthId: profile.id
//         // firstName: profile.name.givenName,
//         // lastName: profile.name.familyName
//       };
//       newOrExistingUser(data, done);
//     }
//   )
// );

// Email password
const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};
passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(user, false, { message: 'User not found' });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err, { message: 'error during password' });
        }
        if (!isMatch) {
          return done(null, false, { message: 'password does not match' });
        }
        return done(null, user);
      });
    } catch (err) {
      return done(err, false, { err });
    }
  })
);

// ** ES6 async await
const newOrExistingUser = async ({ _oAuthId }, done) => {
  // _oAuthId is the google or facebook id not mongoose...
  const existingUser = await User.findOne({ _oAuthId });
  if (existingUser) {
    return done(null, existingUser); // calls passport.serializeUser and passes existingUser as first arg -> user
  }
  // the return above will leave function so we dont need else....
  try {
    const user = await new User({ _oAuthId }).save(); // create new user
    done(null, user);
  } catch (err) {
    done(err);
  }
};

function signup({ email, password, firstName, lastName, req }) {
  const user = new User({ email, password, firstName, lastName });
  if (!email || !password) {
    throw 'You must provide an email and password.';
  }

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw 'Email in Use';
      }
      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid credentials.');
      }

      req.logIn(user, err => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    })({ body: { email, password } }); // syntax important....
  });
}

module.exports = { login, signup };
