import { Router } from "express";
import passport from "passport";
import { changeUserRole, deleteUser, getUserByEmail } from "../controllers/users.controller.js";
import { isAdmin } from '../controllers/sessions.controller.js'

const router = Router();

router.get('/:email', getUserByEmail)
router.put('/premium/:uid', passport.authenticate('current', { session: false }), isAdmin, changeUserRole)
router.delete('/delete/:uid', passport.authenticate('current', { session: false }), deleteUser)

export default router;