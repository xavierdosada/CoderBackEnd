import { Router } from "express";
import passport from "passport";
import { addProduct, deleteProduct, getProductById, pagination, updateProduct } from "../controllers/products.controller.js";
import { isAdmin } from "../controllers/sessions.controller.js";

const router = Router();

router.get('/:limit?/:page?/:sort?', pagination)
router.post('/', passport.authenticate('current', { session: false }), isAdmin, addProduct)
router.get('/:pid', getProductById)
router.put('/:pid', passport.authenticate('current', { session: false }), isAdmin, updateProduct)
router.delete('/:pid', passport.authenticate('current', { session: false }), isAdmin, deleteProduct)

export default router;