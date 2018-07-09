const mongoose = require('mongoose');
const { Schema } = mongoose;

const DirectionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

DirectionSchema.statics.getLocations = function (
  direction_id,
  hiddenFields,
  populatePaths,
  req,
  cb
) {
  const Location = require('mongoose').model('Location');
  const query = Location.find({ direction_id });

  if (req.query.mode == 'populated') {
    for (path of populatePaths) {
      query.populate({
        path: path.path,
        select: req.query.details === 'true' ? [] : path.fields
      });
    }
  }

  query.select(hiddenFields).exec((err, locations) => {
    if (!locations) return cb({ success: false, message: 'Direction ID invalid' });
    cb(err, locations);
  })
}

mongoose.model('Direction', DirectionSchema);
