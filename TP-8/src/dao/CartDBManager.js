import cartsModel from './models/cartsModel.js'
import productsModel from './models/productsModel.js';

export class CartDBManager {

    async getCarts(){
        try{
            const carts = await cartsModel.find().populate('products.product')
            return carts
        }catch (error){
            throw new Error(error.message)
        }
    }

    async getCartsById(id){
        try{
            const cart = await cartsModel.findOne({ _id: id}).populate('products.product')
            return cart
        }catch (error){
            throw new Error(error.message)
        }
    }

    async newCart(){
        try{
            const cartAdded = await cartsModel.create({ product: [] })
            return cartAdded
        }catch(error){
            throw new Error(error.message)
        }
    }

    async addProductToCart(cid, pid){
        try {
            const cart = await cartsModel.findById(cid)
            if(!cart){
                throw new Error('Cart not found')
            } 
            if(!pid){
                throw new Error('Product ID is required')
            }
            const product = await productsModel.findById(pid)
            if(!product){
                throw new Error(`Product doesn't exist`)
            }

            const prodInCart = cart.products.find(prod => prod.product.toString() === pid.toString())
            prodInCart ? prodInCart.quantity += 1 : cart.products.push({ product: pid, quantity: 1})
            await cart.save();
            return cart;
        } catch(error){
            throw new Error(error.message)
        }
    }

    async updateQuantityProducts(cid, pid, quantity){
        try {
            const cart = await cartsModel.findById(cid)
            if(!cart){
                throw new Error('Cart not found')
            } 
            if(!pid){
                throw new Error('Product ID is required')
            }
            const product = await productsModel.findById(pid)
            if(!product){
                throw new Error(`Product doesn't exist`)
            }

            const updateCart = await cartsModel.findByIdAndUpdate(
                cid, //En el carrito con este ID
                {$set: {'products.$[elem].quantity': quantity}}, //Actualizo el quantity
                {
                    arrayFilters: [{'elem.product': pid}], //arrayFilters es un filtro de mongo para saber que producto actualizar
                    new: true // Devuelve el carrito actualizado despues de la actualización
                }
            ).populate('products.product')

            return updateCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProductInCart(cid, pid){
        try {
            if(!cid){
                throw new Error('Cart ID is required')
            }
            if(!pid){
                throw new Error('Product ID is required')
            }
            const product = await productsModel.findById(pid)
            if(!product){
                throw new Error(`Product doesn't exist`)
            }

            const updatedCart = await cartsModel.findByIdAndUpdate( 
                cid, {$pull: {products: pid}}, //Elimino el producto del carrito
                {new: true} // Devuelve el carrito actualizado despues de la eliminación
            ).populate('products.product')

            return updatedCart;
        } catch(error){
            throw new Error(error.message)
        }
    }

    async deleteAllProducts(cid){
        try {
            if(!cid){
                throw new Error('Cart ID is required')
            }

            const emptyCart = await cartsModel.findByIdAndUpdate( 
                cid, {$set: {products: []}}, //Elimino todos los productos, seteando un arraglo vacio
                {new: true} // Devuelve el carrito actualizado despues de la eliminación
            ).populate('products.product')
            return emptyCart
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

