const Product = require('./Product');
const User = require('./User');
const Category = require('./Category');
const Transaction = require('./Transaction');
const TransactionProduct = require('./TransactionProduct');
const Sales = require('./Sales');
const Expense = require('./Expense');

Product.belongsTo(Category);
Sales.belongsTo(Product);

Transaction.belongsToMany(Product, {
  through: TransactionProduct
})


module.exports = { Product, User, Category, Transaction, TransactionProduct, Sales, Expense };

