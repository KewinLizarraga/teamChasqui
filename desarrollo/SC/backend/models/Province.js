const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProvinceSchema = new Schema({
  districts_id: [{ type: Schema.Types.ObjectId, ref: 'District' }],
  name: { type: String, required: true }
}, { timestamps: true });

mongoose.model('Province', ProvinceSchema);
