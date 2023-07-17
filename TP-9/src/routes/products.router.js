import { Router } from "express";
import { ProductDBManager } from "../dao/ProductDBManager.js";
// import { ProductManager } from "../dao/ProductManager.js";
import { io } from '../app.js'
import productsModel from "../dao/models/productsModel.js";
import formatResponse from "../dao/formatResponse.js";

const router = Router();
const pManager = new ProductDBManager()
// const pManager = new ProductManager('./src/products.txt');

router.get('/:limit?/:page?/:sort?', async (req, res) => {
    let { limit, page, sort } = req.params
    let objSort = {}

    if(sort){
        objSort = {price: sort}
    }

    const options = { 
        limit: limit ? parseInt(page) : 10,
        page: page ? parseInt(page) : 1,
        sort: objSort
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`
    
    try {
        const paginate = await productsModel.paginate(req.body, options)
        const response = formatResponse(paginate, options, baseUrl, 'success')
        res.status(200).send(response)
    } catch (error) {
        const response = formatResponse(paginate, options, baseUrl, 'error')
        res.status(400).send(response)
    }
})

router.post('/', async (req, res) => {
    const newProduct = req.body
    try {
        const product = await pManager.addProduct(newProduct)
        const products = await pManager.getProducts() //productos actualizados
        io.emit('updateproducts', products) //los envio por websockets al front
        res.status(201).send({product})
    } catch(error){
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

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const bodyToUpdate = req.body
    try {
        const statusUpdate = await pManager.updateProduct(pid, bodyToUpdate)
        const products = await pManager.getProducts() //productos actualizados
        io.emit('updateproducts', products) //los envio por websockets al front
        res.status(200).send({message: statusUpdate});
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const statusDelete = await pManager.deleteProduct(pid)
        const products = await pManager.getProducts() //productos actualizados
        io.emit('updateproducts', products) //los envio por websockets al front
        res.status(200).send({message: statusDelete})
    } catch(error){
        res.status(404).send({error: error.message})
    }
})

export default router;