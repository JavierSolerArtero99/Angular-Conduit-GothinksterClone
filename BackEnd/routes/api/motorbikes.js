var router = require('express').Router();
var mongoose = require('mongoose');
var Motorbike = mongoose.model('Motorbike');
var User = mongoose.model('User');
var MotorbikeComment = mongoose.model('MotorbikeComment');
var auth = require('../auth');
const { use } = require('./articles');

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
        query.motorbikeTags = { "$in": [req.query.tag] };
    }

    Promise.all([
        req.query.owner ? User.findOne({ username: req.query.owner }) : null,
        req.query.favoritesMotorbikes ? User.findOne({ username: req.query.favoritesMotorbikes }) : null,
    ]).then(function (results) {
        var owner = results[0];
        var favorited = results[1]

        if (owner) {
            query.owner = owner._id;
        }

        if (req.query.favoritesMotorbikes) {
            req.query.favoritesMotorbikes ? query._id = { $in: favorited.favoritesMotorbikes } : query._id = { $in: [] };
        }

        if (req.query.tag) {
            query.motorbikeTags = req.query.tag;
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

/* USER FEED */

/* Obtiene la feed de un usuario */
router.get('/feed', auth.required, function (req, res, next) {
    var limit = 20;
    var offset = 0;

    if (typeof limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof offset !== 'undefined') {
        offset = req.query.offset;
    }

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401) }
        Promise.all([
            Motorbike.find({ owner: { $in: user.following } })
                .limit(Number(limit))
                .skip(Number(offset))
                .populate('owner')
                .exec(),
            Motorbike.count({ owner: { $in: user.following } })
        ]).then(function (results) {
            var motorbikes = results[0];
            var motorbikesCounts = results[1];

            return res.json({
                motorbike: motorbikes.map(function (motorbike) {
                    return motorbike.toJSONFor(user);
                }),
                motorbikesCounts: motorbikesCounts
            });
        }).catch(next);
    });

})

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

            if (req.body.motorbike.motorbikeTags.length !== req.motorbike.motorbikeTags.length) {
                req.motorbike.motorbikeTags = req.body.motorbike.motorbikeTags;
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

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.favoriteMotorbikes(motorbikeId).then(function () {
            return req.motorbike.updateFavoriteCount().then(function (motorbike) {
                return res.json({ motorbike: motorbike.toJSONFor(user) });
            });
        });
    }).catch(next);
});

// Unfavorite an article
router.delete('/:motorbike/favorite', auth.required, function (req, res, next) {
    var motorbikeId = req.motorbike._id;

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.unfavoriteMotorbike(motorbikeId).then(function () {
            return req.motorbike.updateFavoriteCount().then(function (motorbike) {
                return res.json({ motorbike: motorbike.toJSONFor(user) });
            });
        });
    }).catch(next);
});


/* COMMENTS */

/* Obtiene los comentarios de una moto */
router.get('/:motorbike/comments', auth.optional, function (req, res, next) {
    Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
        return req.motorbike.populate({
            path: 'motorbikeComments',
            populate: {
                path: 'owner'
            },
            options: {
                sort: {
                    createdAt: 'desc'
                }
            }
        }).execPopulate().then(function (motorbike) {
            return res.json({
                motorbikeComments: req.motorbike.motorbikeComments.map(function (comment) {
                    return comment.toJSONFor(user);
                })
            });
        });
    }).catch(next);
});

/* Crea un comentario asociado a una moto */
router.post('/:motorbike/comments', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var comment = new MotorbikeComment(req.body.comment);
        comment.motorbike = req.motorbike;
        comment.owner = user;

        return comment.save().then(function () {
            req.motorbike.motorbikeComments === undefined ? req.motorbike.motorbikeComments = [] : req.motorbike.motorbikeComments = req.motorbike.motorbikeComments.concat(comment);
            user.updateKarma(1)
            
            return req.motorbike.save().then(function (motorbike) {
                res.json({ comment: comment.toJSONFor(user) });
            });
        });
    }).catch(next);
});

/* Elimina el comentario de una moto */
router.delete('/:motorbike/comments/:comment', auth.required, function (req, res, next) {
    MotorbikeComment.find({ _id: req.params.comment }).remove().exec()
        .then((data) => res.json(data))
        .catch((error) => res.sendStatus(403))
    // Motorbike.findOne({ slug: req.params.motorbike })
    //     .then((data) => {
    //         console.log(data.motorbikeComments)
    //     })
    //     .catch((error) => console.log(error))
});

module.exports = router;