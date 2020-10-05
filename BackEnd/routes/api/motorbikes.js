var router = require('express').Router();
var mongoose = require('mongoose');
var Motorbike = mongoose.model('Motorbike');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload motorbike objects on routes with '/motorbike'
router.param('motorbike', function (req, res, next, slug) {
    Motorbike.findOne({ slug: slug })
        .populate('owner')
        .then(function (motorbike) {
            if (!motorbike) { return res.sendStatus(404); }

            req.motorbike = motorbike;

            return next();
        }).catch(next);
});

/* CRUD */

/* Obtiene todas las motos */
router.get('/', auth.optional, function (req, res, next) {
    var query = {};
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    }

    Promise.all([
        req.query.owner ? User.findOne({ username: req.query.owner }) : null,
    ]).then(function (results) {
        var owner = results[0];

        if (owner) {
            query.owner = owner._id;
        }

        return Promise.all([
            Motorbike.find(query)
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ createdAt: 'desc' })
                .populate('owner')
                .exec(),
            Motorbike.count(query).exec(),
            req.payload ? User.findById(req.payload.id) : null,
        ]).then(function (results) {
            var motorbikes = results[0];
            var motorbikesCount = results[1];
            var user = results[2];

            return res.json({
                motorbikes: motorbikes.map(function (motorbike) {
                    return motorbike.toJSONFor(user);
                }),
                motorbikesCount: motorbikesCount
            });
        });
    }).catch(next);
});

/* Postea una nueva moto */
router.post('/', auth.required, function (req, res, next) {
    console.log("-Se va a añadir un nuevo motorbike-")
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var motorbike = new Motorbike(req.body.motorbike);

        motorbike.owner = user;

        return motorbike.save().then(function () {
            console.log("===AÑADIENDO UNA NUEVA MOTORBIKE===")
            console.log(motorbike)
            console.log(motorbike.owner);
            return res.json({ motorbike: motorbike.toJSONFor(user) });
        });
    }).catch(next);
});

/* Obtiene una moto */
router.get('/:motorbike', auth.optional, function (req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.motorbike.populate('owner').execPopulate()
    ]).then(function (results) {
        var user = results[0];

        return res.json({ motorbike: req.motorbike.toJSONFor(user) });
    }).catch(next);
});

/* Modifica una  moto */
router.put('/:motorbike', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (req.motorbike.owner._id.toString() === req.payload.id.toString()) {

            if (typeof req.body.motorbike.name !== 'undefined') {
                req.motorbike.name = req.body.motorbike.name;
            }

            if (typeof req.body.motorbike.cv !== 'undefined') {
                req.motorbike.cv = req.body.motorbike.cv;
            }

            if (typeof req.body.motorbike.color !== 'undefined') {
                req.motorbike.color = req.body.motorbike.color;
            }

            req.motorbike.save().then(function (motorbike) {
                return res.json({ motorbike: motorbike.toJSONFor(user) });
            }).catch(next);
        } else {
            return res.sendStatus(403);
        }
    });
});

/* Elimina una moto */
router.delete('/:motorbike', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        if (req.motorbike.owner._id.toString() === req.payload.id.toString()) {
            return req.motorbike.remove().then(function () {
                return res.sendStatus(204);
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});

/* FAVORITES */

router.post('/:motorbike/favorite', auth.required, function (req, res, next) {
    var motorbikeId = req.motorbike._id;

    console.log("==============================MotorbikeID==============================");
    console.log(req.motorbike._id);

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.favoriteMotorbikes(motorbikeId).then(function () {
            return req.motorbike.updateFavoriteCount().then(function (motorbike) {
                console.log("=================\nSEGUNDO PASO COMPLETADO\n=================")
                return res.json({ motorbike: motorbike.toJSONFor(user) });
            });
        });
    }).catch(next);
});

/* FAVORITES */



/* FAVORITES */


module.exports = router;