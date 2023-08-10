import { Router } from "express";
import { addProductToCart, deleteAllProducts, deleteProductInCart, getCarts, getCartsById, newCart, updateQuantityProducts } from '../controllers/carts.controller.js'

const router = Router();

router.get('/', getCarts)
router.get('/:cid', getCartsById)
router.post('/', newCart)
router.post('/:cid/product/:pid', addProductToCart)
router.put('/:cid/products/:pid', updateQuantityProducts)
router.delete('/:cid/products/:pid', deleteProductInCart)
router.delete('/:cid', deleteAllProducts)

export default router;