module.exports = {

    mongoDbUrl : 'mongodb://localhost:27017/cms',

    PORT: process.env.PORT || 8080,
    
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');        
        
        next();
    },

    // user auth middleware
    requireLogin: (req, res, next) => {
        if(!req.session.user_id) {
            return res.redirect('/login')
        }
        next();
    }
};