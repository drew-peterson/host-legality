require('../../server/models'); // how to how require models...
const mongoose = require('mongoose');
const User = mongoose.model('User');
var faker = require('faker');

module.exports = () => {
  const email = faker.internet.email();
  const num = Math.floor(Math.random() * 100);
  return new User({ email: `test${num}_${email}`, password: 'test' }).save();
};
