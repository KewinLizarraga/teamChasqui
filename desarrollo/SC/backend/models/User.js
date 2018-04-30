const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const GeoLocationSchema = require('./common/GeoLocation');

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  nickname: { type: String },
  email: { type: String, required: true, unique: true },
  photo: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  hashed_password: { type: String, default: '', select: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
  country_id: { type: Schema.Types.ObjectId, ref: 'Country' },
  province_id: { type: Schema.Types.ObjectId, ref: 'Province' },
  district_id: { type: Schema.Types.ObjectId, ref: 'District' },
  address: String,
  geo_location: GeoLocationSchema,
  review_count: { type: Number, default: 0 }
}, { timestamps: true });

UserSchema.virtual('password').set(function (password) {
  this._password = password;
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (user._password === undefined) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user._password, salt, (err, hash) => {
      if (err) return next(err);
      user.hashed_password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.hashed_password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}
mongoose.model('User', UserSchema);


