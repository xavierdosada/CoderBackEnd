class ProductManager {
    constructor() { 
        this.products = [];
        this.id = 1;
    }

    addProduct(title,description,price,url,code,stock){
        if (title && description && price && url && code && stock) {
            const verificationCode = this.products.some(product => product.code === code)
            if (verificationCode){
                console.error("ERROR: El codigo esta repetido")
            } else {
                let id = this.id++;
                const newProduct = {id, title, description, price, url, code, stock};
                this.products.push(newProduct);
            }
        } else {
            console.error("ERROR: Debe completar todos los campos")
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const productID = this.products.find(product => product.id === id);
        if (!productID){
            return console.error("Not found")
        } else {
            return console.log("Producto con el ID solicitado: ", productID)
        }
    }
}

const pManager = new ProductManager()

pManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
pManager.addProduct("Fideos", "con tuco", 20, "url", 124, 25);
pManager.addProduct("Fideos", "con tuco", 20, "url", 125, 25);
pManager.addProduct("Fideos", "con tuco", 20, "url", 126, 25);
pManager.getProductById(22);