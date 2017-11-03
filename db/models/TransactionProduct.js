const db = require('../db')
const Sequelize = require('sequelize')

const TransactionProduct = db.define('transactionProduct', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
})

module.exports = TransactionProduct
