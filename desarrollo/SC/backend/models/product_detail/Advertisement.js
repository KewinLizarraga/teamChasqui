const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdvertisementSchema = new Schema({
  deleted: { type: Boolean, default: false },
  start_time: { type: Date, required: true },
  image: String,
  views_count: { type: Number, default: 0 },
  end_time: { type: Date, required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

mongoose.model('Advertisement', AdvertisementSchema);
