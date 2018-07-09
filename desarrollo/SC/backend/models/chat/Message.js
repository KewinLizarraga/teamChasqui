const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  from: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  to: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  chat_id: { type: Schema.Types.ObjectId, required: true, ref: 'Chat' }
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
