const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReplySchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  question_id: { type: Schema.Types.ObjectId, ref: 'Question'},
  message: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  vote_users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

mongoose.model('Reply', ReplySchema);
