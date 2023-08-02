import { Router } from 'express'
import { ProductDBManager } from "../dao/ProductDBManager.js";
import productsModel from '../dao/models/productsModel.js';

const router = Router();
const pManager = new ProductDBManager();

//MIDDELWARES
const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}
const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/api/session/login');
    next();
}

router.get('/products', privateAccess, async (req, res) => {
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
})

router.get('/products/:pid', async (req, res) => {
    try {
    const { pid } = req.params
    const product = await pManager.getProductById(pid)
    const prod = product.toObject() //Lo paso a objeto para que lo lea bien handlebars
    res.render('fullProduct', { product: prod })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await pManager.getProducts();
    res.render('realTimeProducts', { products })
})

router.get('/chat', async (req, res) => {
    res.render('chat', {})
})

//SESSION VIEWSS
router.get('/api/session/register', publicAccess, (req, res) => {
    res.render('register')
})

router.get('/api/session/login', publicAccess, (req, res) => {
    res.render('login')
})

router.get('/api/session/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({status: 'error', error: `Couldn't logout: ${err.message}`})
        res.redirect('/api/session/login')
    })
})

export default router;