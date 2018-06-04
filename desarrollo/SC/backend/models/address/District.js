const mongoose = require('mongoose');
const { Schema } = mongoose;

const DistrictSchema = new Schema({
  name: { type: String, required: true },
  province_id: { type: Schema.Types.ObjectId, ref: 'Province' }
}, { timestamps: true });

mongoose.model('District', DistrictSchema);
