const Sequelize = require('sequelize');
const db = require('../db.js');

const Sales = db.define('sales')

module.exports = Sales;
