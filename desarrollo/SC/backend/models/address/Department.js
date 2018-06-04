const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  country_id: { type: Schema.Types.ObjectId, ref: 'Country' }
}, { timestamps: true });

mongoose.model('Department', DepartmentSchema);
