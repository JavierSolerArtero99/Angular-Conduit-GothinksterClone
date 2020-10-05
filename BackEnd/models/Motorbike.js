var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var MotorbikeSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  cv: String,
  color: String,
  favoritesCount: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

MotorbikeSchema.plugin(uniqueValidator, { message: 'is already taken' });

MotorbikeSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

MotorbikeSchema.methods.slugify = function () {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

MotorbikeSchema.methods.updateFavoriteCount = function () {
  var motorbike = this;

  return User.count({
    favorites: {
      $in: [motorbike._id]
    }
  }).then(function (count) {
    motorbike.favoritesCount = count;

    return motorbike.save();
  });
};

MotorbikeSchema.methods.toJSONFor = function (user) {
  return {
    slug: this.slug,
    name: this.name,
    cv: this.cv,
    color: this.color,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    owner: this.owner.toProfileJSONFor(user)
  };
};

mongoose.model('Motorbike', MotorbikeSchema);
