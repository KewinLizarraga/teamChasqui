const mongoose = require('mongoose');
const { Schema } = mongoose;

const RestaurantDetailSchema = new Schema({
  category: String,
  food_types: [{ type: Schema.Types.ObjectId, ref: 'FoodType' }]
}, { _id: false });

module.exports = RestaurantDetailSchema;
