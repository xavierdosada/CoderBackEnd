import { cartsRepository, productsRepository } from '../repositories/index.js'

const cart_repository = cartsRepository
const product_repository = productsRepository

export const purchase = async (req, res) => {
    const { cid } = req.params
    const purchase_cart = await cart_repository.getCartsById(cid)
    
    //Formateo el Proxy que devuelve mongo
    const cart_products = Object.values(purchase_cart.products)
    
    //creo el arreglo que va a actualizar todos los productos
    const productsToUpdate = [];

    // Itero a través de los productos en el carrito
    for (const prod of cart_products) {
        const product = await product_repository.getProductById(prod.product.id);

        if (!product) {
            return productsToUpdate.push({status: 'error', message: 'Producto no encontrado' });
        }

        if (prod.quantity > product.stock) {
            return productsToUpdate.push({status: 'error', message: 'No hay suficiente stock' });
        }

        product.quantity = product.stock - prod.quantity
        productsToUpdate.push({id: product._id, newStock: product.quantity});
    }

    for (const prod of productsToUpdate) {
        try{
            await product_repository.updateProduct(prod.id, {stock: prod.newStock})
        } catch(error){
            return new Error({error: error.message})
        }
    }
    
    res.status(200).send({status: 'success', message: 'La compra fue realizada con exito!'})
}