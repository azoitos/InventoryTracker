
const Sequelize = require('sequelize')
const db = require('../db')


const Transaction = db.define('transaction', {
	transactionDate: {
		type: Sequelize.DATE,
		defaultValue: Date.now()
	},
})


module.exports = Transaction
