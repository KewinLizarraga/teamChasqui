const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  business_id: { type: Schema.Types.ObjectId, ref: 'Business' },
  message: { type: String, required: true },
  notify: { type: Boolean, default: true },
  reply_count: { type: Number, default: 0 }
}, { timestamps: true });

mongoose.model('Question', QuestionSchema);
