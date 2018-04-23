const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  categories: [String],
  name: { type: String, unique: true, required: true }
}, { timestamps: true });

mongoose.model('Role', RoleSchema);
