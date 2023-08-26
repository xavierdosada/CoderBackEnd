import productsModel from '../dao/models/products.model.js';
import { productsRepository } from "../repositories/index.js";

const product_repository = productsRepository

//MIDDELWARES
export const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}

export const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/api/session/login');
    next();
}

export const productsView = async (req, res) => {
    try {
        const user = req.session.user
        const { page } = req.query
        const products = await productsModel.paginate(
            {},
            {
                limit: 3,
                lean: true,
                page: page ?? 1
            }
    )

    res.render('productsPage', { products, user })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const productByIdView = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await product_repository.getProductById(pid)
        const prod = product.toObject() //Lo paso a objeto para que lo lea bien handlebars
        res.render('fullProduct', { product: prod })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const realTimeProducts = async (req, res) => {
    const products = await product_repository.getProducts();
    res.render('realTimeProducts', { products })
}

export const registerView = async (req, res) => {
    res.render('register')
}

export const loginView = async (req, res) => {
    res.render('login')
}

export const logoutView = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({status: 'error', error: `Couldn't logout: ${err.message}`})
        res.redirect('/api/session/login')
    })
}

export const chat = async (req, res) => {
    res.render('chat', {})
}