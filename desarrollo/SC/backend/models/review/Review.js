const mongoose = require('mongoose');
const { Schema } = mongoose;

const BodySchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true }
}, { _id: false });

const AdminReplySchema = new Schema({
  message: String
}, {
  _id: false,
  timestamps: true
});

const QuestionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  business_id: { type: Schema.Types.ObjectId, ref: 'Business' },
  month_visited: { type: Date, required: true },
  visitor_type: { type: Schema.Types.ObjectId, ref: 'VisitorType' },
  body: BodySchema,
  admin_reply: AdminReplySchema, 
  photo: String,
  stars: { type: Number, default: 0 },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('Review', QuestionSchema);
