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
    localLogin: (obj, { input: { email, password } }, req) => {
      return AuthService.login({ email, password, req });
    },
    localSignup: (obj, { input: { email, password } }, req) => {
      return AuthService.signup({
        email,
        password,
        req
      });
    },
    resetPassword: (obj, { token }, req) => {},
    saveProperty: async (
      obj,
      { input: { googleData, unitNumber, host } },
      req
    ) => {
      if (!req.user) {
        throw 'No Auth';
      }
      try {
        const property = await new Property({
          _user: req.user._id,
          address: googleData.formatted_address,
          unitNumber,
          googleData,
          host
        });
        property.save();
        return property;
      } catch (err) {
        console.log('property err', err);
      }
    }
  }
};

module.exports = resolvers;
