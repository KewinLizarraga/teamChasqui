const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServicePlanSchema = new Schema({
  order: { type: Number, required: true },
  description: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  belongs_to: { type: String, requires: true }
  // product_id: { type: Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

mongoose.model('ServicePlan', ServicePlanSchema);
