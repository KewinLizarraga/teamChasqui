const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodTypeSchema = new Schema({
  businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
  name: String,
  description: String,
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('FoodType', FoodTypeSchema);
