const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeoLocationSchema = new Schema({
  lat: Number,
  lng: Number
}, { _id: false });

module.exports = GeoLocationSchema;
