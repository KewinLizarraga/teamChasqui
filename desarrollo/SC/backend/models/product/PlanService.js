const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanServiceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  deleted: { type: Boolean, default: false },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

mongoose.model('PlanService', PlanServiceSchema);
