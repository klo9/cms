const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;

module.exports = {
  
    index:  async (req, res) => {
        
        const posts = await Post.find().lean();
        const categories = await Category.find().lean();
        
        res.render('default/index', {posts: posts, categories: categories});
    },
    
    loginGet: (req, res) => {
        res.render('default/login');
    },
    
    loginPost: (req, res) => {
      res.send("Congratulations, you've successfully submitted the data.");  
    },
    
    registerGet: (req, res) => {
        res.render('default/register');
    },
    
    registerPost: (req, res ) => {
        res.send("Successfully Registered.");
    },
    
    allPostsGet: async (req, res) => {

        const posts = await Post.find().lean();
        const categories = await Category.find().lean();

        res.render('default/posts/index', {posts: posts, categories: categories});
    },

    postGet: async (req, res) => {
        const {urlPathConfig} = req.params;
        const posts = await Post.findOne({urlPathConfig: urlPathConfig}).lean();
        const categories = await Category.find().lean();

        res.render('default/posts/post', {posts: posts, categories: categories});        
    }
};
