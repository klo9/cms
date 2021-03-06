const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.all('/*', (req, res, next) => {
    
    req.app.locals.layout = 'admin';
    
    next();
});

// admin default index

router.route('/')
    .get(adminController.index);


// admin post endpoints 

router.route('/posts')
    .get(adminController.getPosts);
    


router.route('/posts/create')
    .get(adminController.createPostsGet)
    .post(adminController.submitPosts);


router.route('/posts/edit/:id')
    .get(adminController.editPostGetRoute)
    .put(adminController.editPostUpdateRoute);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);



// admin category endpoints

router.route('/category')
    .get(adminController.getCategories);


router.route('/category/create')
    .post(adminController.createCategories);


router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .put(adminController.editCategoriesPostRoute);

router.route('/category/delete/:id')
    .delete(adminController.deleteCategory);

// logout route

router.route('/logout')
    .post(adminController.logoutRoute);

module.exports = router;

