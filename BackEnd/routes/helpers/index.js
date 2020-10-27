var router = require('express').Router();

router.use('/seed', require('./seed'));

module.exports = router;