// TODO: CREAR UNA FUNCON PARA EL POPULATE
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  business_id: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  message: { type: String, required: true },
  notify: { type: Boolean, default: true, required: true },
  reply_count: { type: Number, default: 0 },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

QuestionSchema.statics.getReplies = (
  question_id,
  hiddenFields,
  populatePaths,
  req,
  cb
) => {
  const Reply = require('mongoose').model('Reply');
  const query = Reply.find({ question_id });

  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, replies) => {
    if (!replies) return cb({ success: false, message: 'Business ID invalid' });
    cb(err, replies);
  });
}

mongoose.model('Question', QuestionSchema);
