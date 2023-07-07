import { Router } from 'express'
import { ProductDBManager } from "../dao/ProductDBManager.js";
import productsModel from '../dao/models/productsModel.js';

const router = Router();
const pManager = new ProductDBManager();


router.get('/products', async (req, res) => {
    try {
    const { page } = req.query
    const products = await productsModel.paginate(
        {},
        {
            limit: 3,
            lean: true,
            page: page ?? 1
        }
    )
    
    res.render('productsPage', { products })
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

export default router;