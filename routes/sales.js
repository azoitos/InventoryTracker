'use strict'

const router = require('express').Router();
const Sales = require('../db/models/Sales');
const Product = require('../db/models/Product');

router.get('/', (req, res, next) => {
    Sales.findAll({
        include: [{
            model: Product
        }]
    })
        .then(sales => res.json(sales))
        .catch(next);
})

//sends post requests to /api/salesReport
router.post('/', (req, res, next) => {
    Sales.create({productId: req.body.id})
        .then(item => {
            res.status(201).json(item)
        })
        .catch(next);
})

module.exports = router;