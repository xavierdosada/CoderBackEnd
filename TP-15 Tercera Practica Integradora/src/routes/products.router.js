import { Router } from "express";
import passport from "passport";
import { addProduct, deleteProduct, getProductById, pagination, updateProduct } from "../controllers/products.controller.js";
import { deleteValidations, isAdmin, isPremium } from "../controllers/sessions.controller.js";
import errorHandlebar from '../services/errors/index.js'

const router = Router();

router.get('/:limit?/:page?/:sort?', pagination)
router.post('/', passport.authenticate('current', { session: false }), isAdmin, addProduct, errorHandlebar)
router.get('/:pid', getProductById)
router.put('/:pid', passport.authenticate('current', { session: false }), updateProduct)
router.delete('/:pid', passport.authenticate('current', { session: false }), deleteValidations, deleteProduct)

export default router;