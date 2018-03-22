jest.setTimeout(30000); // tell jest how long to wait until failing test. default is 5sec this is 30sec

// tell jest to run this file first > package.json
// "jest": {
//   "setupTestFrameworkScriptFile": "./test/setup.js"
// },

require('../server/models');

const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(keys.MONGO_URI);

// create base test user...
const User = mongoose.model('User');
User.findOne({ email: 'test@test.com' }).then(user => {
  console.log('*********************************');
  console.log('TEST@TEST.COM EXISTS');
  console.log('*********************************');
  if (!user) {
    console.log('*********************************');
    console.log('CREATE TEST@TEST.COM');
    console.log('*********************************');
    new User({
      email: 'test@test.com',
      password: 'test'
    }).save();
  }
});
