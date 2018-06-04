const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  belong_to: [String],
  name: { type: String, unique: true, required: true },
  delete: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('Role', RoleSchema);
