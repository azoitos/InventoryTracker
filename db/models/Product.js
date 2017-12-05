const Sequelize = require('sequelize');
const db = require('../db.js');

const Product = db.define('product', {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isInt: true
        }
    }
})

module.exports = Product;
