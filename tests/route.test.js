'use strict'

const expect = require('chai').expect;
const supertest = require('supertest');
const request = require('supertest-as-promised');

const app = require('../server')
const agent = supertest.agent(app)

const db = require('../db')
const { Product, Category } = require('../db/models')

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

    describe('GET /products', () => {
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

        it('returns a product if it is in the DB', function() {
            var product = Product.create({
                productId: 1,
                description: 'This is a test product',
                quantity: 42,
                price: 2017
            });

            return product
            .then( () => {
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

        it('returns multiple products in the DB', function(){
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
                    expect(res.body).to.be.an.instanceof(Array)
                    expect(res.body[0].productId).to.equal(1234)
                    expect(res.body[1].quantity).to.equal(23)
                    expect(res.body).to.have.length(2);
                })
            })
        })
    })
})