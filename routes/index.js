'use strict'
const router = require('express').Router();

router.use('/products', require('./products')); //matches all requests to /api/products/
router.use('/auth', require('./auth')) //matches all requests to /api/auth
router.use('/categories', require('./categories')) //matches all requests to /api/categories
router.use('/salesReport', require('./sales')) //matches all requests to api/salesReport
router.use('/expenseReport', require('./expenses')); //matches all requests to api/expenseReport

router.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status(404);
    next(err);
})

module.exports = router;
