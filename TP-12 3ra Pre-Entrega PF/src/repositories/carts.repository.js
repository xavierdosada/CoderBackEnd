export default class cartsRepository{
    constructor(dao){
        this.dao = dao;
    }

    getCarts = async () => {
        const carts = await this.dao.getCarts();
        return carts
    }

    getCartsById = async (id) => {
        const cart = await this.dao.getCartsById(id);
        return cart;
    }

    createCart = async () => {
        const newCart = await this.dao.newCart();
        return newCart;
    }

    saveCart = async (cart) => {
        const saveCart = await this.dao.saveCart(cart)
    }

    updateQuantity = async (cid, pid, quantity) => {
        const cartUpdated = await this.dao.updateQuantityProducts(cid, pid, quantity)
        return cartUpdated
    }

    deleteProductInCart = async (cid, pid) => {
        const productDeleted = await this.dao.deleteProductInCart(cid, pid);
        return productDeleted;
    }

    deleteAllProductsInCart = async (cid) => {
        const prodsDeleted = await this.dao.deleteAllProducts(cid)
        return prodsDeleted
    }
}