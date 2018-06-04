const mongoose = require('mongoose');
const { Schema } = mongoose;

const VerificationTokenSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

mongoose.model('VerificationToken', VerificationTokenSchema);
