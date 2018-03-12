const log = require('node-pretty-log');
const mongoose = require('mongoose');
const _ = require('lodash');

// const keys = require('../../config/keys');
const AuthService = require('../services/passport');
const Property = mongoose.model('property');

//model

// use helper functions as much as possible
const resolvers = {
  Query: {
    user: (obj, args, req) => {
      // auth check if user is logged in
      return req.user;
    },
    properties: (obj, args, { user }) => {
      if (user) {
        return Property.find({ _user: user._id });
      }
      return null;
    }
  },
  User: {
    properties: (obj, args, req) => {
      return Property.find({ _user: req.user._id });
    }
  },
  Mutation: {
    localLogin: (obj, { email, password }, req) => {
      return AuthService.login({ email, password, req });
    },
    localSignup: (obj, { email, password, firstName, lastName }, req) => {
      return AuthService.signup({ email, password, firstName, lastName, req });
    },
    resetPassword: (obj, { token }, req) => {}
  }
};

module.exports = resolvers;
