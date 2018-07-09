const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  business_id: { type: Schema.Types.ObjectId, required: true, ref: 'Business' },
  count: { type: Number, default: 0 },
  last_message: String
}, { timestamps: true });

ChatSchema.statics.getMessages = function (
  chat_id,
  hiddenFields,
  populatePaths,
  req,
  cb
) {
  const Message = require('mongoose').model('Message');
  const query = Message.find({ chat_id });

  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, messages) => {
    if (!messages) return cb({ success: false, message: 'Chat ID invalid.' });
    cb(err, messages);
  });
}

mongoose.model('Chat', ChatSchema);
