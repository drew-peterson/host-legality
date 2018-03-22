jest.setTimeout(30000); // tell jest how long to wait until failing test. default is 5sec this is 30sec

// tell jest to run this file first > package.json
// "jest": {
//   "setupTestFrameworkScriptFile": "./test/setup.js"
// },

require('../server/models');

const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(keys.MONGO_URI);
const User = mongoose.model('User');

beforeAll(async () => {
  // const _user = await User.findOne({ email: 'test@test.com' });
  // if (!_user) {
  //   // have to return promise
  //   return await new User({
  //     email: 'test@test.com',
  //     password: 'test'
  //   }).save();
  // }
  return await User.findOneOrCreate({ email: 'test@test.com' });
});

// afterAll(async () => {
// console.log('********************************************');

// need to return Promise -- util.promisify doesnst work...
// however this causes duplication errors with create above..
// return new Promise((resolve, reject) => {
//   mongoose.connection.db.dropDatabase((err, res) => {
//     if (err) {
//       return reject(err);
//     }
//     return resolve(res);
//   });
// });
// });
