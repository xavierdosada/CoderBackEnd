import { ProductDBManager } from "../dao/ProductDBManager.js";
import productsModel from '../dao/models/productsModel.js';
const pManager = new ProductDBManager();

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
        const product = await pManager.getProductById(pid)
        const prod = product.toObject() //Lo paso a objeto para que lo lea bien handlebars
        res.render('fullProduct', { product: prod })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const realTimeProducts = async (req, res) => {
    const products = await pManager.getProducts();
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