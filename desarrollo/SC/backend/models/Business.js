const mongoose = require('mongoose');
const { Schema } = mongoose;
const GeoLocation = require('./common/GeoLocation');

const address = new Schema({
  details: String,
  reference: String,
}, { _id: false });

const businessSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
  country_id: { type: Schema.Types.ObjectId, ref: 'Country' },
  province_id: { type: Schema.Types.ObjectId, ref: 'Province' },
  district_id: { type: Schema.Types.ObjectId, ref: 'District' },
  money_types: [{ type: Schema.Types.ObjectId, ref: 'MoneyType' }],
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  city_code: String,
  address: address,
  geo_location: GeoLocation,
  phone: String,
  email: String,
  web_page: String,
  face_page: String,
  photos: [String],
  stars: { type: Number, default: 0 },
  review_count: { type: Number, default: 0 },
  details: { type: Schema.Types.Mixed },
}, { timestamps: true });

mongoose.model('Business', businessSchema);
