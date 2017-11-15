'use strict'

const router = require('express').Router();
const Product = require('../db/models/Product');

router.use('/products', require('./products')); //matches all requests to /api/products/
router.use('/auth', require('./auth')) //matches all requests to /api/auth
router.use('/categories', require('./categories')) //matches all requests to /api/categories


router.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status(404);
    next(err);
})

module.exports = router;
