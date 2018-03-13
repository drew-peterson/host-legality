const keys = require('../../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const stripeChargeCard = require('../middlewares/stripeChargeCard');
const mongoose = require('mongoose');
const Property = mongoose.model('property');
const _ = require('lodash');

module.exports = app => {
  app.put('/api/property/flow/:propertyId', requireLogin, async (req, res) => {
    const { values, step } = req.body;
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    property.compliance.step += 1;
    property.compliance[step] = values;
    property.markModified('compliance');
    property.save();
    res.status(200).send(property);
  });
};
