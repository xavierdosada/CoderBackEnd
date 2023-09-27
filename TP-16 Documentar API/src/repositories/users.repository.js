export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }

    getUserByEmail = async (email) => {
        return await this.dao.getUserByEmail(email);
    }

    getUserById = async (id) => {
        return await this.dao.getUserById(id);
    }

    addCartToUser = async (cid, email) => {
        return await this.dao.addCartToUser(cid, email);
    }

    updateUser = async (email, data) => {
        return await this.dao.updateUser(email, data);
    }
}