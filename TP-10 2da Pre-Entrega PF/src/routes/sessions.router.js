import { Router } from "express"
import passport from "passport";

const router = Router();


//REGISTER
router.post('/register', passport.authenticate('register', {failureRedirect:'/api/session/failregister'}), async (req, res) => {
   res.status(201).send({status: 'success', message: "The user has been registered"})
})

router.get('/failregister', (req, res) => {
   res.status(400).send({status: 'error', error: 'There was an error registering the user'})
})


//LOGIN
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/session/faillogin' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' })
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        admin: req.user.admin
    }
    res.status(200).send({ status: "success", payload: req.session.user, message: "first login" })
})

router.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: 'failed Login' })
})

//GITHUB LOGIN
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    try {
        req.session.user = req.user
        res.redirect('/products')   
    } catch (error) {
        res.status(400).send({status: 'error', error: error.message})  
    } 
})

//DELETE SESSION
router.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout ok')
        else res.send({status: 'Logout ERROR', body: err})
    })
})

//CURRENT

export default router;
