const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const User = require('../models/UserModel').User;
const bcrypt = require('bcrypt');
const session = require('express-session');

module.exports = {
  
    index:  async (req, res) => {
        
        const posts = await Post.find().lean();
        const categories = await Category.find().lean();
        
        res.render('default/index', {posts: posts, categories: categories});
    },

    about: (req, res) => {
        res.render('default/about');
    },
    
    loginGet: (req, res) => {
        res.render('default/login');
    },
    
    loginPost: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // if username doesn't exist
        if(!user) {
            res.redirect('/login');
            return false;
        }

        // validate pw
        await bcrypt.compare(password, user.password)
        .then(() => {
            req.session.user_id = user._id;
            res.redirect('/admin');
        })
    },
    
    registerGet: (req, res) => {
        res.render('default/register');
    },
    
    registerPost: async (req, res ) => {
        const { firstName, lastName, email, username, password } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            firstName,
            lastName,
            email,
            username,
            password: hash
        })
        await user.save()
            .then(() => {
                req.session.user_id = user._id;
                res.redirect('/admin');
            })
            .catch((err) => {
                console.log(err);
                return false;
            })
        
    },
    
    allPostsGet: async (req, res) => {

        const posts = await Post.find().lean();
        const categories = await Category.find().lean();

        res.render('default/posts/index', {posts: posts, categories: categories});
    },

    postGet: async (req, res) => {
        const {urlPathConfig} = req.params;
        await Post.findOne({urlPathConfig: urlPathConfig}).lean().then( post => {
            if(!post) {
                res.status(404).json({message: 'No Post Found'});
            } else {
                res.render('default/posts/post', {post: post});        
            }
        });        
    },

    // policies controllers

    privacyGet: (req, res) => {
        res.render('default/policies/privacypolicy');
    },

    termsGet: (req, res) => {
        res.render('default/policies/terms');
    },

    disclaimersGet: (req, res) => {
        res.render('default/policies/disclaimers');
    }
};
