const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccommodationInfoSchema = new Schema({
  min_stay: Number,
  security: Number,
  staff: Number,
  cleaning: Number,
  cleaning_freq: Number,
  reception: Number,
  bathroom: Number,
  garage: Number
});

const HotelDetailSchema = new Schema({
  room_quantity: { type: Number, default: 0 },
  accommodation_info: AccommodationInfoSchema,
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  checkin_time: String,
  checkout_time: String
}, { _id: false });

module.exports = HotelDetailSchema;
