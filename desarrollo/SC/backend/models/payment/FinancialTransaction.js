const mongoose = require('mongoose');
const { Schema } = mongoose;

const FinancialTransactionSchema = new Schema({
  deleted: { type: Boolean, default: false },
  paymend_id: { type: String, required: true },
  last4: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  invoice_id: { type: Schema.Types.ObjectId, ref: 'Invoice' }
}, { timestamps: true });

mongoose.model('FinancialTransaction', FinancialTransactionSchema);
