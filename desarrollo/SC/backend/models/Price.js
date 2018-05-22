const mongoose = require('mongoose');
const { Schema } = mongoose;

const Price = new Schema({
  min: Number,
  max: Number,
  average: Number
}, { _id: false });

module.exports = Price;
