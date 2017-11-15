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
         return product.increment('quantity', {by: 1})
     })
     .then(editedProduct => {
         console.log(`product ${editedProduct.productId} decremented successfully`)
         res.json(editedProduct)
     })
     .catch(next)
})

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
            res.send({ message: 'Updated Succesful', product: product[1] })
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
        console.log('PRODUCT', product)
        return product.decrement('quantity', {by: 1})
    })
    .then(editedProduct => {
        console.log(`product ${editedProduct.productId} decremented successfully`)
        res.json(editedProduct)
    })
        .then(product => {
            return product.decrement('quantity', { by: 1 })
        })
        .then(editedProduct => {
            console.log(`product ${editedProduct.productId} decremented successfully`)
            res.json(editedProduct)
        })
        .catch(next)
})
//matches DELETE requests to /api/products/productId
router.delete('/:productId', (req, res, next) => {

})

module.exports = router;

