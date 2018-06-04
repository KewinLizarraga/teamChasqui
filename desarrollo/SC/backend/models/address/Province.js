const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProvinceSchema = new Schema({
  name: { type: String, required: true },
  department_id: { type: Schema.Types.ObjectId, ref: 'Department' }
}, { timestamps: true });

mongoose.model('Province', ProvinceSchema);
