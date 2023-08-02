import { Router } from "express"
import passport from "passport";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser())


//REGISTER
router.post('/register', passport.authenticate('register', { failureRedirect: '/api/session/failregister' }), async (req, res) => {
    res.status(201).send({ status: 'success', message: "The user has been registered" })
})

router.get('/failregister', (req, res) => {
    res.status(400).send({ status: 'error', error: 'There was an error registering the user' })
})


//LOGIN
router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
    res.cookie('coderCookieToken', req.user, { httpOnly: true }).send({ status: "success", message: "cookie set" })
})

router.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: 'failed Login' })
})

//GITHUB LOGIN
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/session/login' }), (req, res) => {
    try {
        req.session.user = req.user
        res.redirect('/products')
    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message })
    }
})

//DELETE SESSION
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.redirect('/api/session/login')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

//CURRENT
router.
get('/current', passport.authenticate('current', { session: false }), async (req, res) => {
    res.status(200).send({ currentUser: req.user })
})


export default router;
