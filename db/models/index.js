const Product = require('./Product');
const User = require('./User');
const Category = require('./Category')
const Transaction = require('./Transaction')
const TransactionProduct = require('./TransactionProduct')

Product.belongsTo(Category)
Transaction.belongsToMany(Product, {
  through: TransactionProduct})


module.exports = { Product, User, Category, Transaction, TransactionProduct};

