import { Router } from "express";
import passport from "passport";
import { addProduct, deleteProduct, getProductById, pagination, updateProduct } from "../controllers/products.controller.js";
import { isAdminOrPremium, isAdmin, isPremium } from "../controllers/sessions.controller.js";
import errorHandlebar from '../services/errors/index.js'

const router = Router();

router.get('/:limit?/:page?/:sort?', pagination)
router.post('/', passport.authenticate('current', { session: false }), isAdminOrPremium, addProduct, errorHandlebar)
router.get('/:pid', getProductById)
router.put('/:pid', passport.authenticate('current', { session: false }), isAdminOrPremium, updateProduct)
router.delete('/:pid', passport.authenticate('current', { session: false }), isAdminOrPremium, deleteProduct)

export default router;