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

Product.prototype.decrementQuantity = function () {
    if (this.quantity) {
        console.log('INSTANCE METHOD!')
        this.quantity = this.quantity - 1
    } else {
        console.log(`Item ${this.productId} out of stock`)
    }
}

Product.prototype.incrementQuantity = function () {
    this.quantity = this.quantity + 1
}

module.exports = Product;
