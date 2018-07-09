const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  from: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  to: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  chat_id: { type: Schema.Types.ObjectId, required: true, ref: 'Chat' }
}, { timestamps: true });

MessageSchema.statics.addToChat = function (Message, cb) {
  const Chat = mongoose.model('Chat');
  const { chat_id, message } = Message;
  Chat.findById(chat_id).populate({
    path: 'user_id',
    select: ['first_name', 'last_name', 'photo', 'email']
  }).exec((err, chat) => {
    if (err) return cb({ status: 500, message: { success: false, message: err } });
    if (!chat) return cb({ status: 400, message: { success: false, message: 'Chat does not exist' } });
    chat.last_message = message;
    chat.count = chat.count + 1;
    chat.save((error, chat) => {
      if (error) return cb({ status: 500, message: { success: false, message: err } });
      return cb(null, chat);
    })
  })
}

mongoose.model('Message', MessageSchema);
