if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./ci');
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./testing');
} else {
  module.exports = require('./dev'); // pull in dev keys and export them
}
