import { Router } from 'express'
import passport from "passport";
import { productsView, productByIdView, loginView, logoutView, realTimeProducts, registerView, publicAccess, privateAccess, chat, adminDashboard } from '../controllers/views.controller.js';
import { isUser, isAdmin } from "../controllers/sessions.controller.js";

const router = Router();

router.get('/products', privateAccess, productsView)
router.get('/products/:pid', productByIdView)
router.get('/realtimeproducts', realTimeProducts)
router.get('/api/session/register', publicAccess, registerView)
router.get('/api/session/login', publicAccess, loginView)
router.get('/api/session/logout', logoutView)
router.get('/api/admin-dashboard', passport.authenticate('current', { session: false }), isAdmin, adminDashboard)
router.get('/chat', passport.authenticate('current', { session: false }), isUser, chat)

export default router;