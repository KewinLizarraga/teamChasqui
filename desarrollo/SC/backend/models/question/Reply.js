const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReplySchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  message: { type: String, required: true },
  likes_count: { type: Number, default: 0 },
  dislikes_count: { type: Number, default: 0 },
  vote_users: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('Reply', ReplySchema);
