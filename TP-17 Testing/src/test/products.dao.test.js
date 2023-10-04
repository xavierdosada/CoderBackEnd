import mongoose from 'mongoose'
import { ProductMongoMgr } from '../dao/mongo/product.mongo.js'
import Assert from 'assert'
import env from '../config/config.js'

mongoose.connect(env.MONGO_URL_TESTING)

const assert = Assert.strict

describe('Testing Router Products', () => {

    before(function() {
        this.productsDao = new ProductMongoMgr()
    })

    beforeEach(function(){
        this.timeout(5000)
        mongoose.connection.collections.products.drop();
    })

    it('El dao debe devolver los productos en formato arreglo', async function(){
        const isArray = true;
        const result = await this.productsDao.getProducts();
        console.log(`El resultado es un array ?: ${Array.isArray(result)}`)

        assert.strictEqual(Array.isArray(result), isArray)
    })

    it('El dao debe agregar un producto a la base de datos', async function(){
        const newProduct = {
            title: 'test',
            description: 'test1',
            price: 300,
            status: true,
            code: '27323092342341',
            stock: 1000,
            category: 'postre',
            owner: { role: 'user', createdBy: 'boosi@bochi.com' }
          }

        const result = await this.productsDao.addProduct(newProduct);
        assert.ok(result._id)

    })

    it('El dao debe obtener un producto por el code', async function(){
        const newProduct = {
            title: 'test',
            description: 'test1',
            price: 300,
            status: true,
            code: '27323092342341',
            stock: 1000,
            category: 'postre',
            owner: { role: 'user', createdBy: 'boosi@bochi.com' }
          }
        
        await this.productsDao.addProduct(newProduct);
        
        const prod = await this.productsDao.getProductByCode(newProduct.code)
        assert.ok(prod._id)
        assert.strictEqual(prod.title, newProduct.title)
        assert.strictEqual(prod.description, newProduct.description)
    })

    afterEach( function(){
        mongoose.connection.collections.products.drop();
    })


})