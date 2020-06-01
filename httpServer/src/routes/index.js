const router = require('express').Router();

// routes - individual resources
router.use('/restaurants', require('./restaurant'));

module.exports = router;