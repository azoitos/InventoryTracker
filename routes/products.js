'use strict'

const router = require('express').Router();
const Product = require('../db/models/Product');

//matches GET requests to /api/products
router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next);
})

//matches POST requests to /api/products
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(item => res.status(201).json(item))
        .catch(next);
})

//matches PUT requests to /api/products/productId
router.put('/:productId', (req, res, next) => {
    
})

//matches DELETE requests to /api/products/productId
router.delete('/:productId', (req, res, next) => {
    
})

module.exports = router;

