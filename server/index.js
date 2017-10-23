'use strict'
const express = require('express');
const path = require('path'); //path formatting utility
const bodyParser = require('body-parser'); //parsing middleware
const morgan = require('morgan'); //logging middleware

//define express server
const app = express();

//use morgan logging middleware
app.use(morgan('dev'));

//use body-parser middleware
app.use(bodyParser.json()); //parse JSON requests
app.use(bodyParser.urlencoded({extended: true})); //parse URL requests

//static routing for /public/ path
app.use(express.static(path.join(__dirname, '../public')));

//require routes
app.use('/api', require('../routes/index'));

//send Index HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

//start up server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Welcome! You are now listening on port ${port}`);
});

//error-handling - Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
})

