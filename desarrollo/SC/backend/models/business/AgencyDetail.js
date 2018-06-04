const mongoose = require('mongoose');
const { Schema } = mongoose;

const AgencyDetailSchema = new Schema({
  min_day: Number
});

module.exports = AgencyDetailSchema;
