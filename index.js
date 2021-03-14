const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', (req, res) => {
    res.send('hello');
})

app.listen(8080);