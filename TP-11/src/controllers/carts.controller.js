import { CartDBManager } from '../dao/CartDBManager.js'

const cartDBManager = new CartDBManager()

export const getCarts = async (req, res) => {
    try {
        const carts = await cartDBManager.getCarts();
        res.status(200).send(carts)
    } catch(error){
        res.status(400).send({error: error.message})
    }
}

export const getCartsById = async (req, res) => {
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
}

export const newCart = async (req, res) => {
    try {
        const statusCart = await cartDBManager.newCart();
        res.status(201).send({message: statusCart})
    } catch(error) {
        res.status(400).send({error: error.message})
    }
}

export const addProductToCart = async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    try {
        const statusAdd = await cartDBManager.addProductToCart(cid, pid)
        res.status(200).send({message: statusAdd, status: 'success'})
    } catch(error){
        res.status(400).send({error: error.message})
    }
}

export const updateQuantityProducts = async (req, res) => {
    try{
        const { cid, pid } = req.params
        const { quantity } = req.body
        const result = await cartDBManager.updateQuantityProducts(cid, pid, quantity)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

export const deleteProductInCart = async (req, res) => {
    try{
        const { cid, pid } = req.params
        const result = await cartDBManager.deleteProductInCart(cid, pid)
        res.status(204).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

export const deleteAllProducts = async (req, res) => {
    try{
        const { cid } = req.params
        const result = await cartDBManager.deleteAllProducts(cid)
        res.status(204).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}