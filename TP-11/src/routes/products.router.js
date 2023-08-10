import { Router } from "express";
import { addProduct, deleteProduct, getProductById, pagination, updateProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/:limit?/:page?/:sort?', pagination)
router.post('/', addProduct)
router.get('/:pid', getProductById)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)

export default router;