const mongoose = require('mongoose');
const { Schema } = mongoose;

const PriceSchema = new Schema({
  min: Number,
  max: Number,
  average: Number
}, { _id: false });

module.exports = PriceSchema;
