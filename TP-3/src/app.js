import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express();
const pManager = new ProductManager('./src/products.txt');

app.get('/products', async (req, res) => {
    const limit = req.query.limit
    const products = await pManager.getProducts();
    try {
        if (!limit) {
            res.status(200).send(products)     
        } else {
            const limitProd = products.slice(0,limit)
            res.status(200).send(limitProd)
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await pManager.getProductById(pid)
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})