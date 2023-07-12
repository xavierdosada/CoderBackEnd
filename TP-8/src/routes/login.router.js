import { Router } from "express"
import usersModel from "../dao/models/usersModel.js"

const router = Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    const existEmail = await usersModel.findOne({email: email})
    if(!existEmail) return res.status(400).send({status: 'error', error: `User doesn't exist`})
    const user = await usersModel.findOne({email, password})
    if(!user) return res.status(400).send({status: 'error', error: `Email and password don't match`})
    req.session.user = {
        name: `${user.name} ${user.lastName}`,
        email: user.email,
        age: user.age,
        admin: user.admin
    }
    res.send({status: "success", payload: req.session.user, message: "Primero logueo realizado!"})
})

export default router;