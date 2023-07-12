import { Router } from "express"
import usersModel from '../dao/models/usersModel.js'

const router = Router();

router.post('/', async (req, res) => {
   try {
      const { first_name, last_name, email, age, password } = req.body
      const exist = await usersModel.findOne({email: email})
      if(exist) return res.status(400).send({status:'error', error: 'Email already exists'})
      const user = {
      name: first_name,
      lastName: last_name,
      email: email,
      age: age,
      password: password
   }
   await usersModel.create(user)
   res.status(201).send({status: 'success', message: 'User registered'})
   } catch (error) {
      res.status(400).send({status: 'error', error: error.message})
   }
})

export default router;
