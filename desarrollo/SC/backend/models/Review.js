const mongoose = require('mongoose');
const { Schema } = mongoose;

const BodySchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true }
}, { _id: false });

const AdmiReplySchema = new Schema({
  message: String
}, {
  _id: false,
  timestamps: true
});

const QuestionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  business_id: { type: Schema.Types.ObjectId, ref: 'Business' },
  month_visited: { type: Date, required: true },
  visitor_type: { type: String, required: true },
  body: BodySchema,
  admi_reply: AdmiReplySchema, 
  photo: String,
  start: { type: Number, default: 0 },
}, { timestamps: true });

mongoose.model('Review', QuestionSchema);
