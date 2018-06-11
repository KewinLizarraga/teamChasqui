const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  country_id: { type: String, ref: 'Country' }
}, { timestamps: true });

mongoose.model('Department', DepartmentSchema);
