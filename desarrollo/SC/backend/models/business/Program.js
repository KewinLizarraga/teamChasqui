const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProgramSchema = new Schema({
  nights: Number,
  days: Number,
  price_person: Number,
  min_people: Number,
  description: String,
  include: [String],
  not_include: [String],
  note: String,
  deleted: { type: Boolean, default: false },
  business_id: { type: Schema.Types.ObjectId, ref: 'Business' }
}, { timestamps: true });

mongoose.model('Program', ProgramSchema);
