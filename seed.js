const db = require('./db/db.js');
const { Product, User } = require('./db/models');


const products = [{
    productId: '00001',
    category: `Men's Clothing`,
    description: 'Leather Jacket',
    quantity: 5,
    price: 15000
}, {
    productId: '00002',
    category: `Kids`,
    description: 'Toy car',
    quantity: 10,
    price: 2000
}];

const users = [{
    email: 'god@example.com',
    password: 'boilermaker'
}]


db.sync({ force: true })
    .then(() => {
        return products.map(product => {
            return Product.create(product)
        })
    })
    .then(() => {
        return users.map(user => {
            return User.create(user);
        })
    })
    .then(() => {
        console.log('Finished inserting data')
    })
    .catch((err) => {
        console.error('There was an issue', err, err.stack)
    })
