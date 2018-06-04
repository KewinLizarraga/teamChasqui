const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeoLocationSchema = require('../common/GeoLocation');

const PlaceSchema = new Schema({
  name: String,
  description: String,
  geo_location: GeoLocationSchema
}, { _id: false });

const HourSchema = new Schema({
  hour: Date,
  activity: String
}, { _id: false });

const ProgramDaySchema = new Schema({
  description: String,
  places: [PlaceSchema],
  hours: [HourSchema],
  date: Date,
  deleted: { type: Boolean, default: false },
  program_id: { type:  Schema.Types.ObjectId, ref: 'Program' }

}, { timestamps: true });

mongoose.model('ProgramDay', ProgramDaySchema);
