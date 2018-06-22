// TODO: CREAR UNA FUNCON PARA EL POPULATE
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
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  district_id: { type: String, ref: 'District' },
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
  question_count: { type: Number, default: 0 },
  restaurant_detail: RestaurantDetailSchema,
  hotel_detail: HotelDetailSchema,
  travel_agency_detail: AgencyDetailSchema,
  deleted: { type: Boolean, default: false },
  business_hours: Schema.Types.Mixed,
  price: PriceSchema
}, { timestamps: true });

businessSchema.statics.getNewStars = (stars, review_count, newStar = 0) => {
  console.log(stars, review_count, newStar);
  return (review_count * stars + newStar) / (review_count + 1);
}

businessSchema.statics.getReviews = function (
  business_id,
  hiddenFields,
  populatePaths,
  req,
  cb
) {
  const Review = require('mongoose').model('Review');
  const query = Review.find({ business_id });

  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, reviews) => {
    if (!reviews) return cb({ success: false, message: 'Business ID invalid' });
    cb(err, reviews);
  })
}

businessSchema.statics.getQuestions = function (
  business_id,
  hiddenFields,
  populatePaths,
  req,
  cb
) {
  const Question = require('mongoose').model('Question');
  const query = Question.find({ business_id });

  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, questions) => {
    if (!questions) return cb({ success: false, message: 'Business ID invalid' });
    cb(err, questions);
  });
}

mongoose.model('Business', businessSchema);
