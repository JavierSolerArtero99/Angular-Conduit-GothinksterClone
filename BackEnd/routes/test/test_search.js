var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('./utils');

router.get('/test1/:email', async function (req, res) {
    var user = await utils.SearchUser(req.params);
    if (user) {
        return res.json({ user: user.toAuthJSON() })
    } else {
        return res.status(422).json("ERROR");
    }
})

router.get('/test2/:email', async function (req, res) {
    var user = await User.findOne(req.params);

    if (user) {
        return res.json({ user: user.toAuthJSON() })
    } else {
        return res.status(422).json("ERROR");
    }
})

module.exports = router;