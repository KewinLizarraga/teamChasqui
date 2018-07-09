const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
  direction_id: { type: Schema.Types.ObjectId, required: true, ref: 'Direction' },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { timestamps: true });

mongoose.model('Location', LocationSchema);
