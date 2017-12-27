const Sequelize = require('sequelize');
const db = require('../db.js');

const Sales = db.define('sales', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

module.exports = Sales;
