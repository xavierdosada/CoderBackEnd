import { Router } from "express";
import { CartDBManager } from '../dao/CartDBManager.js'

const router = Router();
const cartDBManager = new CartDBManager()
// const cartManager = new CartManager('./src/carts.txt')

router.get('/', async (req, res) => {
    try {
        const carts = await cartDBManager.getCarts();
        res.status(200).send(carts)
    } catch(error){
        res.status(400).send({error: error.message})
    }
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const cartById = await cartDBManager.getCartsById(cid);
        const prods = cartById.products.toObject()
        // const cartByIdObj = cartById.products.toObj()
        res.render('cart', { prods })
        // res.status(200).send(cartById)
    } catch(error){
        res.status(400).send({error: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const statusCart = await cartDBManager.newCart();
        res.status(201).send({message: statusCart})
    } catch(error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    try {
        const statusAdd = await cartDBManager.addProductToCart(cid, pid)
        res.status(200).send({message: statusAdd, status: 'success'})
    } catch(error){
        res.status(400).send({error: error.message})
    }
})

router.put('/:cid', async (req, res) => {
    try{
        const { cid, pid } = req.params
        const result = await cartDBManager.deleteProductInCart(cid, pid)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params
        const { quantity } = req.body
        const result = await cartDBManager.updateQuantityProducts(cid, pid, quantity)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params
        const result = await cartDBManager.deleteProductInCart(cid, pid)
        res.status(204).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
})

router.delete('/:cid', async (req, res) => {
    try{
        const { cid } = req.params
        const result = await cartDBManager.deleteAllProducts(cid)
        res.status(204).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
})

export default router;