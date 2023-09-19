export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }

    getUserByEmail = async (email) => {
        return await this.dao.getUserByEmail(email);
    }

    addCartToUser = async (cid, email) => {
        return await this.dao.addCartToUser(cid, email);
    }

    updateUser = async (email, data) => {
        return await this.dao.updateUser(email, data);
    }
}