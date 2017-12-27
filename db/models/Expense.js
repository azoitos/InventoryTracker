const Sequelize = require('sequelize');
const db = require('../db.js');

const Expense = db.define('expenses', {
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = Expense;