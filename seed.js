const db = require('./db');
// const { Product, User, Category, Transaction, TransactionProduct } = require('./db/models');
const Product = db.model('product')
const User = db.model('user')
const Category = db.model('category')
const Transaction = db.model('transaction')
const TransactionProduct = db.model('transactionProduct')
const Chance = require('chance')
const chance = new Chance()

const promisesCategories = []
const promisesProducts = []
const promisesTransactions = []
const promisesUsers = []
const promisesTransactionProducts = []

//categoriesSeed
const categories = ['clothing', 'kids', 'misc', 'food', 'hardware', 'software', 'home']

categories.forEach((val) => {
    promisesCategories.push(Category.create({
        name: val
    }))
})

//productsSeed

const productId = [], description = [], quantity = [], price = [], categoryId = []

for (let i = 0; i < 50; i++){
    productId.push(chance.integer({min: 1000, max: 5000}))
    description.push(chance.paragraph({sentences: 1}))
    quantity.push(chance.integer({min: 1, max: 500}))
    price.push(chance.floating({min: 0.99, max: 1000, fixed: 2}))
    categoryId.push(chance.integer({min: 1, max: 7}))
}

productId.forEach((val, i) => {
    promisesProducts.push(Product.create({
        productId: val,
        description: description[i],
        quantity: quantity[i],
        price: price[i],
        categoryId: categoryId[i]
    }))
})

//transactionsSeed
const transactionDate = []

for (let i = 0; i < 200; i++){
    transactionDate.push(chance.date({year: 2017}))
}

transactionDate.forEach((val) => {
    promisesTransactions.push(Transaction.create({
        transactionDate: val
    }))
})

//userSeed
const userEmail = [], password = []
for (let i = 0; i < 10; i++){
    userEmail.push(chance.email())
    password.push(chance.word())
}

userEmail.forEach((email, i) => {
    promisesUsers.push(User.create({
        email: email,
        password: password[i]
    })
)})

db.sync({})
.then(() => Promise.all(promisesCategories))
    .then(() => Promise.all(promisesProducts))
    .then(() => Promise.all(promisesTransactions))
    .then(() => Promise.all(promisesUsers))
    .then(() => {
                Product.findAll({
                attributes: ['id']
            })
            .then((result) => {

                let productIdArr = result.map((rawId) => {
                    return rawId.dataValues
                }).map((idObj) => {
                    return idObj.id
                })

                console.log('PRODUCTTABLEID', productIdArr)

                //transactionProductSeed
                const transactionId = [], productId2 = [], quantity2 = []
                for (let i = 1; i < 50; i++){
                    console.log('iteration', i)
                    transactionId.push(i)
                    productId2.push(Math.ceil(Math.random() * i))
                    quantity2.push(chance.integer({min: 1, max: 20}))
                }
                transactionId.forEach((id, i) => {
                    promisesTransactionProducts.push(TransactionProduct.create({
                        transactionId: id,
                        productId: productId2[i],
                        quantity: quantity2[i]
                    }))
                })
                return Promise.all(promisesTransactionProducts)
            .then(() => {
                console.log('SEED SUCCESS!')
                process.exit(0)
            })
            .catch((err) => {
                console.error(err.parent)
                process.exit(1)
            })
        })
    })
    .catch((err) => {
        console.error(err)
        console.log('ERROR!')
        process.exit(1)
})


// const products = [{
//     productId: '00001',
//     category: `Men's Clothing`,
//     description: 'Leather Jacket',
//     quantity: 5,
//     price: 15000
// }, {
//     productId: '00002',
//     category: `Kids`,
//     description: 'Toy car',
//     quantity: 10,
//     price: 2000
// }];

// const users = [{
//     email: 'god@example.com',
//     password: 'boilermaker'
// }]


// db.sync({ force: true })
//     .then(() => {
//         return products.map(product => {
//             return Product.create(product)
//         })
//     })
//     .then(() => {
//         return users.map(user => {
//             return User.create(user);
//         })
//     })
//     .then(() => {
//         console.log('Finished inserting data')
//     })
//     .catch((err) => {
//         console.error('There was an issue', err, err.stack)
//     })

