const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanDetailSchema = new Schema({
  price_per_month: { type: Number, required: true },
  price_per_year: Number
}, { _id: false });

const AdTypeDetailSchema = new Schema({
  price: { type: Number, required: true },
  views_count: { type: Number, default: 0 }
}, { _id: false });

const ProductSchema = new Schema({
  name: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  type: { type: String, required: true },
  plan_detail: PlanDetailSchema,
  ad_type_detail: AdTypeDetailSchema
}, { timestamps: true });

mongoose.model('Product', ProductSchema);
