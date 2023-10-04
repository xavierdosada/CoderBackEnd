import { Router } from "express";
import passport from "passport";
import { changeUserRole } from "../controllers/users.controller.js";
import { isAdmin } from '../controllers/sessions.controller.js'

const router = Router();

router.put('/premium/:uid', passport.authenticate('current', { session: false }), isAdmin, changeUserRole)

export default router;