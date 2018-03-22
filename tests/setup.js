jest.setTimeout(10000); // tell jest how long to wait until failing test. default is 5sec this is 30sec

// tell jest to run this file first > package.json
// "jest": {
//   "setupTestFrameworkScriptFile": "./test/setup.js"
// },

require('../server/models');

const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(keys.MONGO_URI);
// const User = mongoose.model('User');

// doesnt work on travis....
// beforeAll(() => {
// const _user = await User.findOne({ email: 'test@test.com' });
// if (!_user) {
//   // have to return promise
//   return await new User({
//     email: 'test@test.com',
//     password: 'test'
//   }).save();
// }
// });

// afterAll(async () => {
//   console.log('********************************************');
//   // need to return Promise -- util.promisify doesnst work...
//   // however this causes duplication errors with create above..
//   return new Promise(resolve => {
//     mongoose.connection.db.dropDatabase((err, res) => {
//       return resolve(res);
//     });
//   });
// });
