const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');



router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
})



router.route('/')
    .get(defaultController.index);
    
router.route('/login')
    .get(defaultController.loginGet)
    .post(defaultController.loginPost);


router.route('/register')
    .get(defaultController.registerGet)
    .post(defaultController.registerPost);

router.route('/posts')
    .get(defaultController.allPostsGet);

router.route('/posts/:urlPathConfig')
    .get(defaultController.postGet);


// policies routing

router.route('/privacypolicy')
    .get(defaultController.privacyGet);

router.route('/terms')
    .get(defaultController.termsGet);

router.route('/disclaimers')
    .get(defaultController.disclaimersGet);

module.exports = router;
