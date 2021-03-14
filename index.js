const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

mongoose.connect('mongodb://localhost:27017/cms', {useUnifiedTopology: true, useNewUrlParser: true})
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


// routes
app.use('/', (req, res) => {
    res.send('hello');
})

app.listen(8080);