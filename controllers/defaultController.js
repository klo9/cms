const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const User = require('../models/UserModel').User;
const bcrypt = require('bcrypt');

module.exports = {
  
    index:  async (req, res) => {
        
        const posts = await Post.find().lean();
        const categories = await Category.find().lean();
        
        res.render('default/index', {posts: posts, categories: categories});
    },
    
    loginGet: (req, res) => {
        res.render('default/login');
    },
    
    loginPost: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        const validLogin = await bcrypt.compare(password, user.password);
        if(validLogin){
            res.send('validated');
        } else {
            res.send('failed');
        }
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
                res.redirect('/');
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
    }
};
