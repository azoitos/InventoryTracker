'use strict'
const router = require('express').Router();
const Expense = require('../db/models/Expense');

router.get('/', (req, res, next) => {
    Expense.findAll()
        .then(expenses => res.json(expenses))
        .catch(next);
})

//sends post requests to /api/expenseReport
router.post('/', (req, res, next) => {
    Expense.create(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(next);
})

module.exports = router;