const Sequelize = require('sequelize');
const db = require('../db.js');

const Product = db.define('product', {
    productId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Product;
