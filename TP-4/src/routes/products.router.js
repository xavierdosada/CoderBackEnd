import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const router = Router();
const pManager = new ProductManager('./src/products.txt');

router.get('/', async (req, res) => {
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

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await pManager.getProductById(pid)
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/', async (req, res) => {
    const newProduct = req.body
    try {
        await pManager.addProduct(newProduct) //el id autoincrementable se genera en el productManager
        res.status(201).send("Se agrego un nuevo producto")
    } catch(error){
        res.status(400).send({error: error.message})
    }
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const dataToUpdate = req.body
    try {
        const statusUpdate = await pManager.updateProduct(pid, dataToUpdate)
        res.status(200).send({message: statusUpdate});
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const statusDelete = await pManager.deleteProduct(pid)
        console.log({statusDelete})
        res.status(200).send({message: statusDelete})
    } catch(error){
        res.status(404).send({error: error.message})
    }
})

export default router;