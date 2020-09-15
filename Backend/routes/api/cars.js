var router = require('express').Router();
var mongoose = require('mongoose');
var Car = mongoose.model('Car');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload car objects on routes with ':car'
router.param('car', function(req, res, next, slug) {
  Car.findOne({ slug: slug})
    .populate('owner')
    .then(function (car) {
      if (!car) { return res.sendStatus(404); }

      req.car = car;

      return next();
    }).catch(next);
});

router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.owner ? User.findOne({username: req.query.owner}) : null,
  ]).then(function(results){
    var owner = results[0];
  
    if(owner){
      query.owner = owner._id;
    }

    return Promise.all([ 
      Car.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('owner')
        .exec(),
      Car.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var cars = results[0];
      var carsCount = results[1];
      var user = results[2];

      return res.json({
        cars: cars.map(function(car){
          return car.toJSONFor(user);
        }),
        carsCount: carsCount
      });
    });
  }).catch(next);
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var car = new Car(req.body.car);

    car.owner = user;

    return car.save().then(function(){
      console.log(car.owner);
      return res.json({car: car.toJSONFor(user)});
    });
  }).catch(next);
});

// return a car
router.get('/:car', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.car.populate('owner').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({car: req.car.toJSONFor(user)});
  }).catch(next);
});

// update car
router.put('/:car', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.car.owner._id.toString() === req.payload.id.toString()){

      if(typeof req.body.car.name !== 'undefined'){
        req.car.name = req.body.car.name;
      }

      if(typeof req.body.car.cv !== 'undefined'){
        req.car.cv = req.body.car.cv;
      }

      if(typeof req.body.car.color !== 'undefined'){
        req.car.color = req.body.car.color;
      }

      req.car.save().then(function(car){
        return res.json({car: car.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete car
router.delete('/:car', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.car.owner._id.toString() === req.payload.id.toString()){
      return req.car.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

module.exports = router;