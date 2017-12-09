const Sequelize = require('sequelize');
const db = require('../db.js');

const Sales = db.define('sales', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Sales;
