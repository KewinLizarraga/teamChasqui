const mongoose = require('mongoose');
const { Schema } = mongoose;

const DistrictSchema = new Schema({
  name: { type: String, required: true }
}, { timestamps: true });

mongoose.model('District', DistrictSchema);
