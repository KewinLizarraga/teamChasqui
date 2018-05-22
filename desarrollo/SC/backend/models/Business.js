const mongoose = require('mongoose');
const { Schema } = mongoose;
const GeoLocation = require('./common/GeoLocation');
const Price = require('./Price');

const address = new Schema({
  details: String,
  reference: String,
}, { _id: false });

// DOING

const businessSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
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
  restaurant_detail: {},
  hotel_detail: {},
  travel_agency_detail: {},
  deleted: { type: Boolean, default: false },
  business_hours: Schema.Types.Mixed,
  price: Price
}, { timestamps: true });

mongoose.model('Business', businessSchema);
