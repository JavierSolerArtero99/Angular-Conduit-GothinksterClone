var mongoose = require('mongoose');

var MotorbikeCommentSchema = new mongoose.Schema({
  body: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  motorbike: { type: mongoose.Schema.Types.ObjectId, ref: 'Motorbike' }
}, {timestamps: true});

// Requires population of author
MotorbikeCommentSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    owner: this.owner.toProfileJSONFor(user)
  };
};

mongoose.model('MotorbikeComment', MotorbikeCommentSchema);
