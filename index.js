const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongodbUrl} = require('./config/configuration');
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
app.use('/', (req, res) => {
    res.render('default/index')
})

app.listen(8080);