import passport from "passport";
import { Router } from "express";
import { addProductToCart, deleteAllProducts, deleteProductInCart, getCarts, getCartsById, createCart, updateQuantityProducts } from '../controllers/carts.controller.js'
import { purchase } from "../controllers/purchase.controller.js";
import { isUserOrPremium, isOwnCart } from "../controllers/sessions.controller.js";

const router = Router();

router.get('/', getCarts)
router.get('/:cid', getCartsById)
router.post('/', passport.authenticate('current', { session: false }), createCart)
router.post('/:cid/product/:pid', passport.authenticate('current', { session: false }), isUserOrPremium, isOwnCart, addProductToCart)
router.post('/:cid/purchase', passport.authenticate('current', { session: false }), purchase)
router.put('/:cid/products/:pid', updateQuantityProducts)
router.delete('/:cid/products/:pid', deleteProductInCart)
router.delete('/:cid', deleteAllProducts)

export default router;