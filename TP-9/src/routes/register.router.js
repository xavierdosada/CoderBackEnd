import { Router } from "express"
import passport from "passport";

const router = Router();

router.post('/', passport.authenticate('register', {failureRedirect:'/register/failregister'}), async (req, res) => {
   res.status(201).send({status: 'success', message: "The user has been registered"})
})

router.get('/failregister', (req, res) => {
   res.status(400).send({status: 'error', error: 'There was an error registering the user'})
})

export default router;
