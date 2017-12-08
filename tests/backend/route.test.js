'use strict'

const chai = require('chai');
const chaiThings = require('chai-things');
const chaiProperties = require('chai-properties');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const supertest = require('supertest');
const request = require('supertest-as-promised');
const app = require('../../server')
const agent = supertest.agent(app)

const db = require('../../db')
const { Product, Category } = require('../../db/models')

describe('Products Route', () => {
    //Clear the database before every test

    beforeEach(() => {
        return db.sync({
            force: true
        })
    })

    //Also, we empty the tables after each spec
    afterEach(() => {
        return Promise.all([
            Product.truncate({ cascade: true }),
            Category.truncate({ cascade: true })
        ])
    })

    describe('GET ALL /products', () => {
        it('responds with an array via JSON', function () {
            return agent
                .get('/api/products')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    // res.body is the JSON return object
                    expect(res.body).to.be.an.instanceOf(Array);
                    expect(res.body).to.have.length(0);
                });
        })

        it('returns a product if it is in the DB', function () {
            var product = Product.create({
                productId: 1,
                description: 'This is a test product',
                quantity: 42,
                price: 2017
            });

            return product
                .then(() => {
                    return agent
                        .get('/api/products')
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).to.be.an.instanceof(Array);
                            expect(res.body[0].description).to.equal('This is a test product');
                            expect(res.body).to.have.length(1);
                        })
                })
        })

        it('returns multiple products in the DB', function () {
            var product1 = Product.create({
                productId: 1234,
                description: 'This is a test product',
                quantity: 42,
                price: 2017
            });

            var product2 = Product.create({
                productId: 4567,
                description: 'This is a test 2 product',
                quantity: 23,
                price: 1892
            });

            return product1
                .then(() => {
                    return product2
                })
                .then(() => {
                    return agent
                        .get('/api/products')
                        .expect(200)
                        .expect(res => {
                            expect(res.body).to.be.an('array')
                            expect(res.body).to.contain.a.thing.with.property('productId', 1234)
                            expect(res.body).to.contain.a.thing.with.property('productId', 4567)
                            expect(res.body).to.have.length(2);
                        })
                })
        })
    })

    describe('GET ONE PRODUCT /articles/:productId', function () {
        var mainProduct;

        beforeEach(function () {
            var addingProducts = [
                {
                    productId: 1234,
                    description: 'This is a test 1 product',
                    quantity: 21,
                    price: 2015
                },
                {
                    productId: 4567,
                    description: 'This is a test 2 product',
                    quantity: 2,
                    price: 2016
                },
                {
                    productId: 8910,
                    description: 'This is the product I want',
                    quantity: 42,
                    price: 2000
                }
            ];

            var addingProductPromise = addingProducts.map(product => Product.create(product));

            return Promise.all(addingProductPromise)
                .then(addedProducts => {
                    mainProduct = addedProducts[2]
                })
        })

        it('returns the JSON of the product based on the productId', function () {
            return agent
                .get(`/api/products/${mainProduct.productId}`)
                .expect(200)
                .expect(function (res) {
                    if (typeof res.body === 'string') {
                        res.body = JSON.parse(res.body);
                    }
                    expect(res.body.description).to.equal('This is the product I want')
                    expect(res.body.quantity).to.equal(42);
                })
        })
        it('responds with a 404 if the product does not exist', function () {
            return agent
                .get('/api/products/1231231')
                .expect(404);
        })
    })

    describe('POST - ADD A NEW PRODUCT - /api/products', function () {
        it('creates a new product', function () {
            return agent
                .post('/api/products')
                .send({
                    productId: 999,
                    description: 'New added article',
                    quantity: 1,
                    price: 1500
                })
                .expect(201)
                .expect(function (res) {
                    expect(res.body.productId).to.equal(999);
                    expect(res.body.description).to.equal('New added article');
                    expect(res.body.quantity).to.equal(1);
                    expect(res.body.price).to.equal(1500);
                })
        })

        it('does not create a new product without a description', function () {
            return agent
                .post('/api/products')
                .send({
                    productId: 999,
                    quantity: 1,
                    price: 1500
                })
                .expect(500);
        })
    })
    describe('PUT - UPDATE PRODUCT - /api/products/:productId', function () {
        let product;

        beforeEach(function () {
            return Product.create({
                productId: 1234,
                description: 'Original Article',
                quantity: 10,
                price: 1000
            })
                .then(createdArticle => {
                    product = createdArticle
                })
        })

        it('updates a product', function () {
            return agent
                .put(`/api/products/${product.productId}`)
                .send({
                    description: 'Update Product Description',
                })
                .expect(200)
                .expect(function (res) {
                    expect(res.body.message).to.equal('Updated Successfully')
                    expect(res.body.product.productId).to.equal(1234);
                    expect(res.body.product.description).to.equal('Update Product Description');
                    expect(res.body.product.quantity).to.equal(10);
                    expect(res.body.product.price).to.equal(1000);
                })
        })

        it('saves updates to the DB', function () {

            return agent
                .put(`/api/products/${product.productId}`)
                .send({
                    description: 'Update Product Description',
                })
                .then(function () {
                    return Product.findOne({
                        where: {
                            productId: product.productId
                        }
                    })
                })
                .then(function (foundProduct) {
                    expect(foundProduct.description).to.equal('Update Product Description');
                });

        });

        it('gets 500 for invalid update', function () {

            return agent
                .put(`/api/products/${product.productId}`)
                .send({ description: '' })
                .expect(500);

        });
    })
    describe('PUT - Add to product quantity - /api/products/:productId/add', function () {
        let product;

        beforeEach(function () {
            return Product.create({
                productId: 1234,
                description: 'Original Article',
                quantity: 10,
                price: 1000
            })
                .then(createdArticle => {
                    product = createdArticle
                })
        })

        it('increments a product quantity', function () {
            return agent
                .put(`/api/products/${product.productId}/add`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.productId).to.equal(1234);
                    expect(res.body.description).to.equal('Original Article');
                    expect(res.body.quantity).to.equal(11);
                    expect(res.body.price).to.equal(1000);
                })
        })
    })
    describe('Delete - Decrement to product quantity - /api/products/:productId/delete', function () {
        let product;
        let zeroQuantityProduct;
        beforeEach(function () {
            var deletedProducts = [
                {
                    productId: 1234,
                    description: 'Original Article',
                    quantity: 10,
                    price: 1000
                },
                {
                    productId: 4567,
                    description: 'Out of Stock',
                    quantity: 0,
                    price: 1000
                }
            ]
            var deletingProductPromise = deletedProducts.map(deletedproduct => Product.create(deletedproduct));

            return Promise.all(deletingProductPromise)
                .then(deletingProducts => {
                    product = deletingProducts[0]
                    zeroQuantityProduct = deletingProducts[1]
                })
        })

        it('increments a product quantity', function () {
            return agent
                .delete(`/api/products/${product.productId}/delete`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.productId).to.equal(1234);
                    expect(res.body.description).to.equal('Original Article');
                    expect(res.body.quantity).to.equal(9);
                    expect(res.body.price).to.equal(1000);
                })
        })

        it('does not decrement below zero', function () {
            return agent
                .delete(`/api/products/${zeroQuantityProduct.productId}/delete`)
                .expect(500)
                .expect(function (res) {
                    expect(res.body.message).to.equal('Cannot decrement below 0')
                })
        })
    })
    describe('Deletes entire products - /api/products/:productId', function () {
        let product;

        beforeEach(function () {
            return Product.create({
                productId: 1234,
                description: 'Original Article',
                quantity: 10,
                price: 1000
            })
                .then(createdArticle => {
                    product = createdArticle
                })
        })

        it('deletes product', function () {
            return agent
                .delete(`/api/products/${product.productId}`)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.message).to.equal('Product Removed');
                })
        })
        it('removes product from DB', function () {

            return agent
                .delete(`/api/products/${product.productId}`)
                .then(function () {
                    return Product.findOne({
                        where: {
                            productId: product.productId
                        }
                    })
                })
                .then(function (foundProduct) {
                    expect(foundProduct).to.equal(null);
                });

        });
    })
})
