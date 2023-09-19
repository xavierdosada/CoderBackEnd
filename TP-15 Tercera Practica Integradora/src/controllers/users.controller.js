import { userRepository } from '../repositories/index.js'

const user_repository = userRepository

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req
        const user = await user_repository.getUserByEmail(email)
        res.status(200).send({payload: "successfully", user})
    } catch (error) {
        res.status(400).send({payload: "Error", error: error.message})
    }
}

export const addCartToUser = async (req, res) => {
    try {
        const { id, email } = req
        if(!id || !email) throw new Error("id or email missing")

        const user = await user_repository.addCartToUser(id, email)
        res.status(200).send({payload: "successfully", user})
    } catch (error) {
        res.status(400).send({payload: "Error", error: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const { email, data } = req
        const result = await user_repository.updateUser(email, data)
        res.status(200).send({payload: "successfully", result})
    } catch (error) {
        res.status(400).send({payload: "Error", error: error.message})
    }
}