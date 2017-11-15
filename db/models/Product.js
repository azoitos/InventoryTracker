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
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Product.prototype.decrementQuantity = function(){
    if (this.quantity){
        console.log('INSTANCE METHOD!')
        this.quantity = this.quantity - 1
    } else {
        console.log(`Item ${this.productId} out of stock`)
    }
}

Product.prototype.incrementQuantity = function() {
    this.quantity = this.quantity + 1
}

module.exports = Product;
