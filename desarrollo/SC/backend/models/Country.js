const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
  provinces_id: [{ type: Schema.Types.ObjectId, ref: 'Province' }],
  name: { type: String, required: true }
}, { timestamps: true });

mongoose.model('Country', CountrySchema);
