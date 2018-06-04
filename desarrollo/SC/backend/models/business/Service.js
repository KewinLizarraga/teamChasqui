const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  deleted: { type: Boolean, default: false },
  businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }]
}, { timestamps: true });

mongoose.model('Service', ServiceSchema);
