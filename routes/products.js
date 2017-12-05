'use strict'

const router = require('express').Router();
const Product = require('../db/models/Product');
const Category = require('../db/models/Category')

//matches GET requests to /api/products

router.get('/exampleProductId', (req, res, next) => {
    Product.findAll({
        attributes: ['productId']
    })
        .then((result) => {
            console.log('result!!!!', result.map((id) => {
                return id.dataValues
            }))
            res.json(result)
        })
})

router.get('/', (req, res, next) => {
    Product.findAll({
        include: [{
            model: Category
        }]
    })
        .then((products) => {
            return res.json(products)
        })
        .catch(next);
})

router.get('/:productId', (req, res, next) => {
    Product.findOne({
        where: {
            productId: req.params.productId
        }
    })
        .then(product => {
            if (product) res.json(product)
            else res.sendStatus(404);
        })
        .catch(next);
})

//matches POST requests to /api/products
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(next);
})

//matches PUT requests to /api/products/productId

router.put('/:productId/add', (req, res, next) => {
    Product.findOne({
        include: [{
            model: Category,
        }],
        where: {
            productId: Number(req.params.productId)
        }
    })
        .then(product => {
            return product.increment('quantity', { by: 1 })
        })
        .then(editedProduct => {
            res.json(editedProduct)
        })
        .catch(next)
})

router.put('/:productId', (req, res, next) => {
    Product.update(req.body, {
        include: [{
            model: Category
        }],
        where: {
            productId: req.params.productId
        },
        returning: true,
        plain: true
    })
        .then(product => {
            res.send({ message: 'Updated Successfully', product: product[1] })
        })
        .catch(next)
})

router.delete('/:productId/delete', (req, res, next) => {
    Product.findOne({
        include: [{
            model: Category,
        }],
        where: {
            productId: Number(req.params.productId)
        }
    })
        .then(product => {
            if (product.quantity > 0) {
                return product.decrement('quantity', { by: 1 })
            }
            else {
                res.status(500).send({message: 'Cannot decrement below 0'})
            }
        })
        .then(editedProduct => {
            res.json(editedProduct)
        })
        .catch(next)
})
//matches DELETE requests to /api/products/productId
router.delete('/:productId', (req, res, next) => {
    Product.destroy({
        where: {
            productId: Number(req.params.productId)
        }
    })
        .then(() => res.send({ message: 'Product Removed' }))
        .catch(next)
})

module.exports = router;

