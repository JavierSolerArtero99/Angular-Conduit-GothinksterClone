var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.SearchUser = async function (email) {
    var user = await User.findOne(email);
    return user;
}