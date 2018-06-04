const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: { type: String, required: true }
}, { timestamps: true });

mongoose.model('Country', CountrySchema);
