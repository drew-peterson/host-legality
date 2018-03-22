jest.setTimeout(10000); // tell jest how long to wait until failing test. default is 5sec this is 30sec

// tell jest to run this file first > package.json
// "jest": {
//   "setupTestFrameworkScriptFile": "./test/setup.js"
// },

require('../server/models');

const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(keys.MONGO_URI);
