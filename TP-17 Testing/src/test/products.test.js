import mongoose from 'mongoose'
import env from '../config/config.js'
import chai from 'chai'
import supertest from 'supertest'
import { ProductMongoMgr } from '../dao/mongo/product.mongo.js'

const expect = chai.expect
const requester = supertest(`http://localhost:8080`)

mongoose.connect(env.MONGO_URL_TESTING)

describe.only('Testing Router Products', () => {
    let session;

    before('login and set cookie', async () => {
        const mockUser = {
            email: "test123123@gmail.com",
            password: "barroPremium",
        }

        let loginRes;
        loginRes = await requester.post('/api/session/login').send(mockUser)
        session = loginRes.headers['set-cookie'][0].split(';')[0].split('=')[1]
    })

    it('GET /api/products -- Sin una cookie debe devolver Unathorized', async () => {
        const newProduct = {
            title: 'test',
            description: 'test1',
            price: 300,
            status: true,
            code: '273276872341',
            stock: 1000,
            category: 'postre',
            owner: { role: 'user', createdBy: 'boosi@bochi.com' }
        }

        const {statusCode, unauthorized} = await requester.post('/api/products').send(newProduct)
        expect(statusCode).to.equal(401)
        expect(unauthorized).to.equal(true)
    })

    it('GET /api/products -- Debe crear un nuevo producto', async () => {
        const newProduct = {
            title: 'test',
            description: 'test1',
            price: 300,
            status: true,
            code: '273276872341',
            stock: 1000,
            category: 'postre',
            owner: { role: 'user', createdBy: 'boosi@bochi.com' }
        }

        const result = await requester.post('/api/products').set('Cookie',[`testingJwt=${session}`]).send(newProduct)
        console.log(result)
        expect(result.statusCode).to.equal(201)
    })
})