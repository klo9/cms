// modules

const {globalVariables} = require('./config/configuration');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/configuration');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const {selectOption} = require('./config/customFunctions');
const fileUpload = require('express-fileupload');


const app = express();


// connect mongoose to mongodb
mongoose.connect(mongoDbUrl, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
});



// configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// flash and session

app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());


// global variables from config
app.use(globalVariables);


// file upload middleware
app.use(fileUpload());

// handlebars view engine
app.engine('handlebars', hbs({
    defaultLayout: 'default', 
    helpers: {select: selectOption}
}));
app.set('view engine' , 'handlebars');


// method override middleware
app.use(methodOverride('newMethod'));


// routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
