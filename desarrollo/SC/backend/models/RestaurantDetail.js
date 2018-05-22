const mongoose = require('mongoose');
const { Schema } = mongoose;

const RestaurantDetail = new Schema({
  category: String,
  food_types: [{ type: Schema.Types.ObjectId, ref: 'FoodType' }]
}, { _id: false });

module.exports = RestaurantDetail;
