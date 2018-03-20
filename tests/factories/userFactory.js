require('../../server/models'); // how to how require models...
const mongoose = require('mongoose');
const User = mongoose.model('User');
var faker = require('faker');

module.exports = () => {
  const email = faker.internet.email();
  return new User({ email }).save();
};
