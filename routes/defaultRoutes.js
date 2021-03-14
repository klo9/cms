const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

// routes
router.route('/')
    .get(defaultController.index);

router.route('/login')
    .get(defaultController.login)

module.exports = router;