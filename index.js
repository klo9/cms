const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongodbUrl, PORT} = require('./config/config');
const app = express();

mongoose.connect(mongodbUrl, {useUnifiedTopology: true, useNewUrlParser: true})
    .then( res => {
        console.log('mongodb connected successfully')
    })
    .catch( err => {
        console.log('mongodb connection failed')
    })

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.engine('hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

// routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes)

app.listen(PORT);