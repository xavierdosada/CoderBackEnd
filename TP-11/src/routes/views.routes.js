import { Router } from 'express'
import { productsView, productByIdView, loginView, logoutView, realTimeProducts, registerView, publicAccess, privateAccess } from '../controllers/views.controller.js';

const router = Router();

router.get('/products', privateAccess, productsView)
router.get('/products/:pid', productByIdView)
router.get('/realtimeproducts', realTimeProducts)
router.get('/api/session/register', publicAccess, registerView)
router.get('/api/session/login', publicAccess, loginView)
router.get('/api/session/logout', logoutView)

export default router;