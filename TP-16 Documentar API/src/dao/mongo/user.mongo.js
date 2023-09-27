import UserModel from "../models/user.model.js";

export class UserMongoMgr{
    async getUserByEmail(email){
        try {
            const user = await UserModel.findOne({email: email})
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getUserById(id){
        try {
            const user = await UserModel.findOne({_id: id})
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async addCartToUser(cid, email){
        try {
            const user = await UserModel.findOneAndUpdate(
                {email: email},
                {$set: { cart: cid }},
                {new: true }
            );
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateUser(email, data){
        try {
            const result = await UserModel.updateOne({email: email}, data)
            return {message: `The user was updated successfully`, status: result}
        } catch (error) {
            throw new Error({error: error.message})
        }
    }


}