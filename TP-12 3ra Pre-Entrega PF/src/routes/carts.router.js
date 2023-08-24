import passport from "passport";
import { Router } from "express";
import { addProductToCart, deleteAllProducts, deleteProductInCart, getCarts, getCartsById, newCart, updateQuantityProducts } from '../controllers/carts.controller.js'
import { purchase } from "../controllers/purchase.controller.js";
import { isUser } from "../controllers/sessions.controller.js";

const router = Router();

router.get('/', getCarts)
router.get('/:cid', getCartsById)
router.post('/', newCart)
router.post('/:cid/product/:pid', passport.authenticate('current', { session: false }), isUser, addProductToCart)
router.post('/:cid/purchase', purchase)
router.put('/:cid/products/:pid', updateQuantityProducts)
router.delete('/:cid/products/:pid', deleteProductInCart)
router.delete('/:cid', deleteAllProducts)

export default router;