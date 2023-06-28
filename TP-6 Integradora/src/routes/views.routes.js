import { Router } from 'express'
import { ProductManager } from '../dao/ProductManager.js'

const router = Router();
const pManager = new ProductManager('./src/products.txt');


router.get('/', async (req, res) => {
    const products = await pManager.getProducts();
    res.render('home', { products })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await pManager.getProducts();
    res.render('realTimeProducts', { products })
})

router.get('/chat', async (req, res) => {
    res.render('chat', {})
})

export default router;