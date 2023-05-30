import { Router } from "express";
import { CartManager } from '../CartManager.js'

const router = Router();
const cartManager = new CartManager('./src/carts.txt')

router.post('/', async (req, res) => {
    try {
        const statusCart = await cartManager.newCart();
        res.status(201).send({message: statusCart})
    } catch(error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const statusAdd = await cartManager.addProductToCart(cid, pid)
        res.status(200).send({message: statusAdd})
    } catch(error){
        res.status(400).send({error: error.message})
    }
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const cartById = await cartManager.getCartsById(cid);
        res.status(200).send(cartById)
    } catch(error){
        res.status(400).send({error: error.message})
    }
})

export default router;