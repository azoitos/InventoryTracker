'use strict'

const router = require('express').Router();
const Product = require('../db/models/Product');

//matches GET requests to /api/products
router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => res.json(product))
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
    Product.update(req.body, {
        where: {
            productId: req.params.productId
        },
        returning: true,
        plain: true
    })
    .then(product => {
        console.log(product)
        res.send({message: 'Updated Succesful', product: product[1]})
    })
    .catch(next)
})

//matches DELETE requests to /api/products/productId
router.delete('/:productId', (req, res, next) => {
    
})

module.exports = router;

