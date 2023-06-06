import { Router } from 'express'
import { ProductManager } from '../ProductManager.js';

const router = Router();
const pManager = new ProductManager('./src/products.txt');
const products = await pManager.getProducts();

router.get('/', (req, res) => {
    res.render('home', { products })
})

router.get('/realtimeproducts', (req, res) => {

    res.render('realTimeProducts', { products })
})

export default router;