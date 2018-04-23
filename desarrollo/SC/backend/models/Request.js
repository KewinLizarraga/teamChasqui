const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  business_id: { type: Schema.Types.ObjectId, ref: 'Business' },
  details: { type: Schema.Types.Mixed }
}, { timestamps: true });

mongoose.model('Request', RequestSchema);
