import { Router } from "express"

const router = Router();

//DELETE SESSION
router.get('/', (req, res) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout ok')
        else res.send({status: 'Logout ERROR', body: err})
    })
})

export default router;
