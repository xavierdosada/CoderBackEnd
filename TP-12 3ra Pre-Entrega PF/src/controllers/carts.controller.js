import { cartsRepository, productsRepository } from '../repositories/index.js'

const cart_repository = cartsRepository
const product_repository = productsRepository

export const getCarts = async (req, res) => {
    try {
        const carts = await cart_repository.getCarts();
        res.status(200).send(carts)
    } catch(error){
        res.status(400).send({error: error.message})
    }
}

export const getCartsById = async (req, res) => {
    const cid = req.params.cid
    try {
        const cartById = await cart_repository.getCartsById(cid);
        const prods = cartById.products.toObject()
        res.render('cart', { prods })
        res.status(200).send(prods)
    } catch(error){
        res.status(400).send({error: error.message})
    }
}

export const newCart = async (req, res) => {
    try {
        const statusCart = await cart_repository.newCart();
        res.status(201).send({message: statusCart})
    } catch(error) {
        res.status(400).send({error: error.message})
    }
}

export const addProductToCart = async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    try {
        if(!cid){
            throw new Error('Cart ID is required')
        }
        if(!pid){
            throw new Error('Product ID is required')
        }

        const cart = await cart_repository.getCartsById(cid);
        if(!cart){
            throw new Error('Cart not found')
        } 

        const product = await product_repository.getProductById(pid)
        if(!product){
            throw new Error(`Product doesn't exist`)
        }

        //Formateo el Proxy que devuelve mongo y luego hago el find
        const cart_products = Object.values(cart.products)
        const prodInCart = cart_products.find(prod => prod._doc._id === pid)
        prodInCart ? prodInCart.quantity += 1 : cart.products.push({ product: pid, quantity: 1})

        const statusAdd = await cart_repository.saveCart(cart)
        res.status(200).send({message: statusAdd, status: 'success'})
    } catch(error){
        res.status(400).send({error: error.message})
    }
}

export const updateQuantityProducts = async (req, res) => {
    try{
        const { cid, pid } = req.params
        const { quantity } = req.body

        if(!cid){
            throw new Error('Cart ID is required')
        }
        if(!pid){
            throw new Error('Product ID is required')
        }

        const cart = await cart_repository.getCartsById(cid);
        if(!cart){
            throw new Error('Cart not found')
        } 

        const product = await product_repository.getProductById(pid)
        if(!product){
            throw new Error(`Product doesn't exist`)
        }

        const result = await cart_repository.updateQuantityProducts(cid, pid, quantity)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

export const deleteProductInCart = async (req, res) => {
    try{
        const { cid, pid } = req.params

        if(!cid){
            throw new Error('Cart ID is required')
        }
        if(!pid){
            throw new Error('Product ID is required')
        }

        const cart = await cart_repository.getCartsById(cid);
        if(!cart){
            throw new Error('Cart not found')
        } 

        const product = await product_repository.getProductById(pid)
        if(!product){
            throw new Error(`Product doesn't exist`)
        }

        const result = await cart_repository.deleteProductInCart(cid, pid)
        res.status(204).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}

export const deleteAllProducts = async (req, res) => {
    try{
        const { cid } = req.params

        if(!cid){
            throw new Error('Cart ID is required')
        }

        const result = await cart_repository.deleteAllProducts(cid)
        res.status(204).send(result)
    }catch(error){
        res.status(400).send({error: error.message})
    }
}