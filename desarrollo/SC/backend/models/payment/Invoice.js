const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  amount: { type: Number, default: 0 },
  deleted: { type: Boolean, default: false },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

mongoose.model('Invoice', InvoiceSchema);
