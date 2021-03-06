'use strict'
const express = require('express');
const path = require('path'); //path formatting utility
const bodyParser = require('body-parser'); //parsing middleware
const morgan = require('morgan'); //logging middleware
const session = require('express-session'); //session middleware
const passport = require('passport'); //passport middleware
const User = require('../db/models/User')

//define express server
const app = express();

//use morgan logging middleware
app.use(morgan('dev'));

//use body-parser middleware
app.use(bodyParser.json()); //parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); //parse URL requests

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'terribleSecret',
    resave: false,
    saveUninitialized: false
}));

// //keep track of a total /api request count per client
// app.use('/api', (req, res, next) => {
//     if (!req.session.counter) req.session.counter = 0;
//     console.log('counter', ++req.session.counter);
//     next();
// })

//static routing for /public/ path
app.use(express.static(path.join(__dirname, '../public')));

//require routes
app.use('/api', require('../routes/index'));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    try {
        done(null, user.id);
    } catch (err) {
        done(err);
    }
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(done);
})

//send Index HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

//error-handling - Handle 500 errors
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'testing'){
        console.error(err);
        console.error(err.stack);
    }
    res.status(err.status || 500).send(err.message || 'Internal server error.');
})

module.exports = app;
