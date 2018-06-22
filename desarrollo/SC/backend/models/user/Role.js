const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  belong_to: [String],
  name: { type: String, unique: true, required: true },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.model('Role', RoleSchema);
