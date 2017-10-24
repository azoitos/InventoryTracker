const db = require('./db/db.js');
const { Product } = require('./db/models');


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

db.sync({ force: true })
    .then(() => {
        return products.map(product => {
            return Product.create(product)
        })
    })
    .then(() => {
        console.log('Finished inserting data')
    })
    .catch((err) => {
        console.error('There was an issue', err, err.stack)
    })
