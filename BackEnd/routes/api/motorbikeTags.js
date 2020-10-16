var router = require('express').Router();
var mongoose = require('mongoose');
var Motorbike = mongoose.model('Motorbike');

// return a list of tags
router.get('/', function(req, res, next) {
    console.log("Devolviendo los TAGS");
  Motorbike.find().distinct('motorbikeTags').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
