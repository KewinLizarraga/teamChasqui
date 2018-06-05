const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProvinceSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  department_id: { type: String, ref: 'Department' }
}, { timestamps: true });

mongoose.model('Province', ProvinceSchema);
