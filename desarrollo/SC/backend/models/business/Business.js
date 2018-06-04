const mongoose = require('mongoose');
const { Schema } = mongoose;
const GeoLocationSchema = require('../common/GeoLocation');
const PriceSchema = require('./Price');
const RestaurantDetailSchema = require('./RestaurantDetail');
const HotelDetailSchema = require('./HotelDetail');
const AgencyDetailSchema = require('./AgencyDetail');

const AddressSchema = new Schema({
  details: String,
  reference: String,
}, { _id: false });

const businessSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User'},
  district_id: { type: Schema.Types.ObjectId, ref: 'District' },
  money_types: [{ type: Schema.Types.ObjectId, ref: 'MoneyType' }],
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  city_code: String,
  address: AddressSchema,
  geo_location: GeoLocationSchema,
  phone: String,
  email: String,
  web_page: String,
  face_page: String,
  photos: [String],
  stars: { type: Number, default: 0 },
  review_count: { type: Number, default: 0 },
  restaurant_detail: RestaurantDetailSchema,
  hotel_detail: HotelDetailSchema,
  travel_agency_detail: AgencyDetailSchema,
  deleted: { type: Boolean, default: false },
  business_hours: Schema.Types.Mixed,
  price: PriceSchema
}, { timestamps: true });

mongoose.model('Business', businessSchema);
