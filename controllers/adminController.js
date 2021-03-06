const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const {isEmpty} = require('../config/customFunctions');

module.exports = {

    index: (req, res) => {
            res.render('admin/index');
    },


    // admin posts endpoints


    getPosts: (req, res) => {
        Post.find().lean()
            .populate('category')
            .then(posts => {
                res.render('admin/posts/index', {posts: posts});
            });
    },


    createPostsGet: (req, res) => {
        Category.find().lean().then(cats => {

            res.render('admin/posts/create', {categories: cats});
        });


    },

    submitPosts: (req, res) => {

        const commentsAllowed = req.body.allowComments ? true : false;

        // Check for any input file
        let filename = '';
        
       if(!isEmpty(req.files)) {
           let file = req.files.uploadedFile;
           filename = file.name;
           let uploadDir = './public/uploads/';
           
           file.mv(uploadDir+filename, (err) => {
               if (err)
                   throw err;
           });
        }
        
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            urlPathConfig: req.body.urlPathConfig,
            allowComments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });


    },


    editPostGetRoute: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .lean()
            .then(post => {

                Category.find().lean().then(cats => {
                    res.render('admin/posts/edit', {post: post, categories: cats});
                });


            })
    },

    editPostUpdateRoute: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;


        const id = req.params.id;

        Post.findById(id)
            .then(post => {

                post.title = req.body.title;
                post.status = req.body.status;
                post.urlPathConfig = req.body.urlPathConfig;
                post.allowComments = req.body.allowComments;
                post.description = req.body.description;
                post.category = req.body.category;


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');

                });
            })
            .catch((err) => {
                res.redirect('/');
            });

    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },


    // for categories

    getCategories: (req, res) => {

        Category.find().lean().then(cats => {
            res.render('admin/category', {categories: cats});
        });
    },

    createCategories: (req, res) => {
        let categoryName = req.body.catName;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(category => {
                req.flash('success-message', 'Category created successfully.');
                res.redirect('/admin/category');
            });
        }

    },

    editCategoriesGetRoute: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find().lean();


        Category.findById(catId).lean().then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});

        });
    },


    editCategoriesPostRoute: async (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.catName;

        if (newTitle) {
            await Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(updated => {
                    req.flash('success-message', 'Category created successfully.');
                    res.redirect('/admin/category');
                });

            });
        }
    },

    deleteCategory: (req, res) => {
        Category.findByIdAndDelete(req.params.id)
            .then(deletedCat => {
            req.flash('success-message', `The post ${deletedCat.title} has been deleted.`);
            res.redirect('/admin/category');
        });
    },
    // logout

    logoutRoute: (req, res) => {
        req.session.user_id = null;
        res.redirect('/login');
    }
};    
    
