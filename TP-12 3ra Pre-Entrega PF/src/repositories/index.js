import DaoFactory from '../dao/factory.js'
import CartsRepository from './carts.repository.js'
import ProductsRepository from './products.repository.js'

const carts = DaoFactory.getCartDao()
const products = DaoFactory.getProductDao()

export const cartsRepository = new CartsRepository(carts)
export const productsRepository = new ProductsRepository(products)