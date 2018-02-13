const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Property = mongoose.model('property');
const _ = require('lodash');

module.exports = app => {
  app.post('/api/property', requireLogin, async (req, res) => {
    const { unitNumber, googleData, host } = req.body;

    try {
      const property = await new Property({
        _user: req.user._id,
        address: googleData.formatted_address,
        unitNumber,
        googleData,
        host
      });
      property.save();

      // have to convert to object before we can remove field and return...
      const returnProperty = property.toObject();
      delete returnProperty.googleData;

      res.status(200).send(returnProperty);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/api/property', requireLogin, async (req, res) => {
    const properties = await Property.find({ _user: req.user._id });
    const propertiesNormalize = _.keyBy(properties, p => p._id); // convert array to object map
    res.status(200).send(propertiesNormalize);
  });
};
