import DaoFactory from '../dao/factory.js'
import CartsRepository from './carts.repository.js'
import ProductsRepository from './products.repository.js'
import MessagesRepository from './messages.repository.js'

const carts = DaoFactory.getCartDao()
const products = DaoFactory.getProductDao()
const messages = DaoFactory.getMessageDao()

export const cartsRepository = new CartsRepository(carts)
export const productsRepository = new ProductsRepository(products)
export const messagesRepository = new MessagesRepository(messages)