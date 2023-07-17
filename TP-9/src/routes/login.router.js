import { Router } from "express"
import passport from "passport"

const router = Router()

router.post('/', passport.authenticate('login', { failureRedirect: '/login/faillogin' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
    req.session.user = {
        name: `${req.user.name} ${req.user.lastName}`,
        email: req.user.email,
        age: req.user.age,
        admin: req.user.admin
    }
    res.status(200).send({ status: "success", payload: req.session.user, message: "first login" })
})

router.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: 'failed Login' })
})

//GITHUB ROUTER
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    try {
        req.session.user = req.user
        res.redirect('/products')   
    } catch (error) {
        res.status(400).send({status: 'error', error: error.message})  
    } 
})

export default router;