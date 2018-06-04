const mongoose = require('mongoose');
const { Schema } = mongoose;

const VisitorTypeSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('VisitorType', VisitorTypeSchema);
