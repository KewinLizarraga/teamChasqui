const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentDetailSchema = new Schema({
  payment_id: String,
  last4: String,
  brand: String,
  name: String,
  amount: Number
}, { _id: false });

const FinancialTransactionSchema = new Schema({
  deleted: { type: Boolean, default: false },
  invoice_id: { type: Schema.Types.ObjectId, ref: 'Invoice' },
  payment_detail: PaymentDetailSchema
}, { timestamps: true });

mongoose.model('FinancialTransaction', FinancialTransactionSchema);
