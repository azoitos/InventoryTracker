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
    })
})