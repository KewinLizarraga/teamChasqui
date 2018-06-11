const mongoose = require('mongoose');
const { Schema } = mongoose;

const DistrictSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  province_id: { type: String, ref: 'Province' }
}, { timestamps: true });

mongoose.model('District', DistrictSchema);
