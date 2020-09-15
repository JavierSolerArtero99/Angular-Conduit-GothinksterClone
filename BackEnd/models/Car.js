var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var CarSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  cv: String,
  color: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

CarSchema.plugin(uniqueValidator, {message: 'is already taken'});

CarSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

CarSchema.methods.slugify = function() {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

CarSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    name: this.name,
    cv: this.cv,
    color: this.color,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    owner: this.owner.toProfileJSONFor(user) 
  };
};

mongoose.model('Car', CarSchema);
