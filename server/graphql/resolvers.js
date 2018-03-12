const log = require('node-pretty-log');
const _ = require('lodash');
// const AuthService = require('../services/auth');
// const keys = require('../../config/keys');
require('../models/User');
require('../models/Property');

//model
const mongoose = require('mongoose');
const Property = mongoose.model('property');

// use helper functions as much as possible
const resolvers = {
  Query: {
    user: (obj, args, req) => {
      // auth check if user is logged in
      return req.user;
    }
  },
  User: {
    properties: async (obj, args, req) => {
      // return Property.find({ _user: req.user._id });
      const properties = await Property.find({ _user: req.user._id });
      const normalized = _.keyBy(properties, p => p._id); // convert array to object map
      return normalized;
    }
  }
};

module.exports = resolvers;
