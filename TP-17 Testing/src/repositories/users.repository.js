export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }

    getUserByEmail = async (email) => {
        const user = await this.dao.getUserByEmail(email);
        return user
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

    deleteUser = async (id) => {
        return await this.dao.deleteUser(id)
    }

    setLastConnection = async (id) => {
        return await this.dao.setLastConnection(id)
    }

    updateUserDocuments = async (id, files) => {
        return await this.dao.updateUserDocuments(id, files)
    }
}