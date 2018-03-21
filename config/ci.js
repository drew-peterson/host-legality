// module.exports = {
//   googleClientID:
//     '512227074926-rg11btqfqm21lheq6uterlfi7432o7lj.apps.googleusercontent.com',
//   googleClientSecret: 'B27inwogWR1DffLrreksJz0-',
//   FACEBOOK_APP_ID: '173102873298551',
//   FACEBOOK_APP_SECRET: 'fa096f8524f34486de4e8c3ba6f990d7',
//   MONGO_URI: 'mongodb://127.0.0.1:27017/host_legality_ci',
//   COOKIE_KEY: 'jasdfjkawerjwerhrkejkdkxjhzsxhdwerwxddddsdfjsdlfkjfjskw',
//   STRIPE_PUBLISHABLE_KEY: 'pk_test_ZRQpB7B9vIQFhYozuoUbjVYW',
//   STRIPE_SECRET_KEY: 'sk_test_EKDSMMLJbQwyZTitGCwRcCzl',
//   SENDGRID_KEY:
//     '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',
//   REDIRECT_DOMAIN: 'http://localhost:3000',
//   REDIS_URL: 'redis://127.0.0.1:6379' // default port for redis
// };

module.exports = {
  googleClientID: process.env.googleClientID,
  googleClientSecret: process.env.googleClientSecret,
  // FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  // FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  COOKIE_KEY: process.env.COOKIE_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  REDIS_URL: process.env.REDIS_URL,
  SENDGRID_KEY: process.env.SENDGRID_KEY,
  REDIRECT_DOMAIN: process.env.REDIRECT_DOMAIN
};
