export default class productDTO{
    constructor(product){
        this.title = product.title
        this.description = product.description
        this.price = product.price
        this.status = product.status
        this.code = product.code
        this.stock = product.stock
        this.category = product.category
    }
}