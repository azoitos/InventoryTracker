'use strict'

const router = require('express').Router();
const Category = require('../db/models/Category');
const Product = require('../db/models/Product');

router.get('/', (req, res, next) => {
    Category.findAll({ include: [Product] })
        .then(categories => res.json(categories))
        .catch(next);
})

module.exports = router;
